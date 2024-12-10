using ProductReviewApi.Data;
using ProductReviewApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductReviewApi.Services
{
    public class ReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Add a new review
        public async Task<Review> AddReviewAsync(Review review)
        {
            // Add the review to the database
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();  // Commit the changes to the database
            return review;
        }

        // Get reviews for a specific product
        public async Task<List<Review>> GetReviewsByProductIdAsync(int productId)
        {
            return await _context.Reviews
                .Where(r => r.ProductId == productId)
                .ToListAsync();  // Fetch reviews related to the given product ID
        }

        // Get a single review by ID
        public async Task<Review?> GetReviewByIdAsync(int id)
        {
            return await _context.Reviews.FindAsync(id);  // Return the review if found, or null if not found
        }

        // Delete a review by ID
        public async Task<bool> DeleteReviewAsync(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return false;

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
