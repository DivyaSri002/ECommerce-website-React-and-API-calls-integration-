using Microsoft.EntityFrameworkCore;
using ProductReviewApi.Models;

namespace ProductReviewApi.Data{
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    { }

    public required DbSet<Product> Products { get; set; }
    public required DbSet<Review> Reviews { get; set; }
}
}