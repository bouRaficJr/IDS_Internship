using Microsoft.EntityFrameworkCore;
using ITHelpDeskBackend.Models;

namespace ITHelpDeskBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<TicketHistory> TicketHistories { get; set; }
        public DbSet<User> Users { get; set; }
       // public DbSet<Role> Roles { get; set; }
        //public DbSet<Category> Categories { get; set; }
        //public DbSet<Priority> Priorities { get; set; }
        //public DbSet<Status> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Map table relationships and handle naming rules if necessary
            modelBuilder.Entity<Ticket>().ToTable("Tickets");
            modelBuilder.Entity<Comment>().ToTable("Comments");
            modelBuilder.Entity<TicketHistory>().ToTable("TicketHistories");
        }
    }
}