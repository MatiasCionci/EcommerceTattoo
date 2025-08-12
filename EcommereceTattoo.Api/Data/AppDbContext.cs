using Microsoft.EntityFrameworkCore;
using EcommereceTattoo.Api.Models;

namespace EcommereceTattoo.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
