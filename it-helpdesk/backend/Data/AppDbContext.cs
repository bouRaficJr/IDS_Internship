using Microsoft.EntityFrameworkCore;
using ITHelpDeskBackend.Models;

namespace ITHelpDeskBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Keep your initial Users table here:
        public DbSet<User> Users { get; set; }

        // ADD THIS LINE: This tells Entity Framework that the Tickets table exists!
        public DbSet<Ticket> Tickets { get; set; }
    }
}