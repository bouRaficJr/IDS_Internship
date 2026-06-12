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
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // GET: api/Comments/ticket/{ticketId}
        // Excludes internal notes if the requesting user is a standard End User (Role 3)
        // ==========================================
        [HttpGet("ticket/{ticketId}")]
        public async Task<IActionResult> GetCommentsForTicket(int ticketId, [FromQuery] int userRoleId)
        {
            try
            {
                var query = _context.Comments
                    .Where(c => c.TicketId == ticketId);

                // SECURITY GUARD: If the user role is 3 (End User), filter out internal agent notes
                if (userRoleId == 3)
                {
                    query = query.Where(c => !c.IsInternal);
                }

                var comments = await query
                    .OrderBy(c => c.CreatedAt)
                    .ToListAsync();

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to load comment feed.", error = ex.Message });
            }
        }

        // ==========================================
        // POST: api/Comments
        // Adds a new reply or internal agent note and updates ticket timestamp
        // ==========================================
        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                comment.CreatedAt = DateTime.UtcNow;
                _context.Comments.Add(comment);

                // Update the Ticket's modified timestamp to flag activity
                var ticket = await _context.Tickets.FindAsync(comment.TicketId);
                if (ticket != null)
                {
                    ticket.UpdatedAt = DateTime.UtcNow;
                    _context.Tickets.Update(ticket);

                    // LOG AUDIT TRAIL: Create automatic system history log
                    var user = await _context.Users.FindAsync(comment.UserId);
                    var userName = user != null ? user.FullName : "Someone";
                    var noteType = comment.IsInternal ? "internal note" : "public comment";

                    var history = new TicketHistory
                    {
                        TicketId = comment.TicketId,
                        ChangedByUserId = comment.UserId,
                        FieldChanged = "Comment",
                        OldValue = null,
                        NewValue = $"{userName} added an {noteType}."
                    };
                    _context.TicketHistories.Add(history);
                }

                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCommentsForTicket), new { ticketId = comment.TicketId, userRoleId = 1 }, comment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to save comment.", error = ex.Message });
            }
        }
    }
}