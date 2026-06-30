using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ITHelpDeskBackend.Models;
using ITHelpDeskBackend.Data;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace ITHelpDeskBackend.Controllers
{
    [ApiController]
    [Route("api/TicketHistories")] // Ensures frontend fetch calls still route here perfectly!
    public class ActivityLogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActivityLogsController(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // GET: api/TicketHistories
        // Returns ALL recent system activities (Global Audit Trail) for the Dashboard
        // ==========================================
        [HttpGet]
        public async Task<IActionResult> GetGlobalActivityLogs([FromQuery] int limit = 20)
        {
            try
            {
                var globalLogs = await (from h in _context.TicketHistories
                                       join u in _context.Users on h.ChangedByUserId equals u.Id
                                       join t in _context.Tickets on h.TicketId equals t.Id
                                       orderby h.ChangedAt descending
                                       select new {
                                           h.Id,
                                           h.TicketId,
                                           TicketReference = t.ReferenceNo,
                                           TicketTitle = t.Title,
                                           h.FieldChanged,
                                           h.OldValue,
                                           h.NewValue,
                                           h.ChangedAt,
                                           ChangedByUser = u.FullName
                                       })
                                       .Take(limit)
                                       .ToListAsync();

                return Ok(globalLogs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to load global activity logs.", error = ex.Message });
            }
        }

        // ==========================================
        // GET: api/TicketHistories/ticket/{ticketId}
        // Returns the list of actions performed on a specific ticket
        // ==========================================
        // Change the signature to include 'async' and 'Task<>'
[HttpGet("logs/ticket/{ticketId}")] 
public async Task<IActionResult> GetHistoryForTicketAsync(int ticketId) 
{
    try
    {
        // Now that the method is marked 'async', this 'await' will work
        var historyWithUsers = await (from h in _context.TicketHistories
                                      join u in _context.Users on h.ChangedByUserId equals u.Id
                                      where h.TicketId == ticketId
                                      orderby h.ChangedAt descending
                                      select new {
                                          h.Id,
                                          h.TicketId,
                                          h.FieldChanged,
                                          h.OldValue,
                                          h.NewValue,
                                          h.ChangedAt,
                                          ChangedByUser = u.FullName
                                      }).ToListAsync();

        return Ok(historyWithUsers);
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = "Failed to load audit trail logs.", error = ex.Message });
    }
}
    }
}
