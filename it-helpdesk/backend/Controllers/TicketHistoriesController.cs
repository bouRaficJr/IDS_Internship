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
    [Route("api/[controller]")]
    public class TicketHistoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TicketHistoriesController(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // GET: api/TicketHistories/ticket/{ticketId}
        // Returns the list of actions performed on a specific ticket
        // ==========================================
        [HttpGet("ticket/{ticketId}")]
        public async Task<IActionResult> GetHistoryForTicket(int ticketId)
        {
            try
            {
                // Join histories with Users to display the name of the person who made the change
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