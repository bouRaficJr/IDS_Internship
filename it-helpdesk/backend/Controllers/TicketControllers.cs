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
    public class TicketsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TicketsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            try
            {
                var tickets = await _context.Tickets.OrderByDescending(t => t.CreatedAt).ToListAsync();
                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Database link failure", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicketById(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return NotFound(new { message = $"Ticket #{id} not found." });
            return Ok(ticket);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket([FromBody] Ticket ticket)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                // Auto-generate reference number if empty
                if (string.IsNullOrEmpty(ticket.ReferenceNo)) 
                {
                    ticket.ReferenceNo = $"INC-{DateTime.UtcNow.Year}-{new Random().Next(1000, 9999)}";
                }
                
                ticket.CreatedAt = DateTime.UtcNow;
                ticket.UpdatedAt = DateTime.UtcNow;

                _context.Tickets.Add(ticket);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetTicketById), new { id = ticket.Id }, ticket);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to save ticket", error = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicketStatus(int id, [FromBody] Ticket targetUpdate)
        {
            if (id != targetUpdate.Id) return BadRequest(new { message = "ID mismatch." });

            var existingTicket = await _context.Tickets.FindAsync(id);
            if (existingTicket == null) return NotFound(new { message = "Ticket not found." });

            existingTicket.StatusId = targetUpdate.StatusId; 
            existingTicket.PriorityId = targetUpdate.PriorityId;
            existingTicket.CategoryId = targetUpdate.CategoryId;
            existingTicket.Title = targetUpdate.Title;
            existingTicket.Description = targetUpdate.Description;
            existingTicket.UpdatedAt = DateTime.UtcNow;

            try
            {
                _context.Tickets.Update(existingTicket);
                await _context.SaveChangesAsync();
                return Ok(existingTicket);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to update", error = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}