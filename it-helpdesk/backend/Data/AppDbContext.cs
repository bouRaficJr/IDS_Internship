using Microsoft.EntityFrameworkCore;
using ITHelpDeskBackend.Models;

namespace ITHelpDeskBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
