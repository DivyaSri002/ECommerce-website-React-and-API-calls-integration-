using Microsoft.AspNetCore.Mvc;
using ProductReviewApi.Models;
using ProductReviewApi.Services;
using System.Threading.Tasks;

namespace ProductReviewApi.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ReviewService _reviewService;

        public ReviewsController(ReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        // POST: api/reviews
        [HttpPost]
        public async Task<IActionResult> AddReview([FromBody] Review review)
        {
            if (review == null)
            {
                return BadRequest("Review data is required.");
            }

            // Call the service method to add the review
            var createdReview = await _reviewService.AddReviewAsync(review);

            // Return 201 Created with the location of the new resource
            return CreatedAtAction(nameof(GetReview), new { id = createdReview.ReviewId }, createdReview);
        }

        // GET: api/reviews?productId=1
        [HttpGet]
        public async Task<IActionResult> GetReviews(int productId)
        {
            // Fetch reviews using the service
            var reviews = await _reviewService.GetReviewsByProductIdAsync(productId);

            if (reviews == null || reviews.Count == 0)
            {
                return NotFound("No reviews found for this product.");
            }

            return Ok(reviews);  // Return the list of reviews for the product
        }

        // GET: api/reviews/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReview(int id)
        {
            var review = await _reviewService.GetReviewByIdAsync(id);
            if (review == null)
            {
                return NotFound($"Review with ID {id} not found.");
            }

            return Ok(review);  // Return the review if found
        }

        // DELETE: api/reviews/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var result = await _reviewService.DeleteReviewAsync(id);
            if (!result)
            {
                return NotFound($"Review with ID {id} not found.");
            }

            return NoContent();  // Return 204 No Content to indicate successful deletion
        }
    }
}
