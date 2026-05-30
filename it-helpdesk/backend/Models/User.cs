using System.ComponentModel.DataAnnotations.Schema;

namespace ITHelpDeskBackend.Models
{
    [Table("Users")]
    public class User
    {
        public int Id { get; set; }
        
        [Column("role_id")]
        public int RoleId { get; set; }
        
        [Column("full_name")]
        public string FullName { get; set; } = string.Empty;
        
        public string Email { get; set; } = string.Empty;
        
        [Column("password_hash")]
        public string PasswordHash { get; set; } = string.Empty;
        
        public string? Phone { get; set; }
        
        [Column("last_login_at")]
        public DateTime? LastLoginAt { get; set; }
        
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.Date;
        
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}