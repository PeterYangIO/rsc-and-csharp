using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    class PostRequest
    {
        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Language { get; set; } = "text";

        [Required]
        public string Code { get; set; } = string.Empty;
    }

    class Post : PostRequest
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;
    }

    class PostDb : DbContext
    {
        public PostDb(DbContextOptions<PostDb> options) : base(options) { }

        public DbSet<Post> Posts => Set<Post>();
    }
}
