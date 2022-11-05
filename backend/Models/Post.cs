using Microsoft.EntityFrameworkCore;

namespace Models
{
    class PostRequest
    {
        public string Description { get; set; } = string.Empty;
        public string Language { get; set; } = "text";
        public string Code { get; set; } = string.Empty;
    }

    class Post : PostRequest
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
    }

    class PostDb : DbContext
    {
        public PostDb(DbContextOptions<PostDb> options) : base(options) { }

        public DbSet<Post> Posts => Set<Post>();
    }
}
