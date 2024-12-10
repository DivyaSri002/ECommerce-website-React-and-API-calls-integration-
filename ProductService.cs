using ProductReviewApi.Data;
using ProductReviewApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductReviewApi.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(int id);  // Notice the nullable return type
    }

    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Fetch all products
        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        // Fetch a product by its ID
        public async Task<Product?> GetProductByIdAsync(int id)
        {
            // Notice the nullable return type
            return await _context.Products.FindAsync(id);
        }
    }
}
