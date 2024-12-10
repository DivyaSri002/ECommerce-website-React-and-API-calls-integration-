using Microsoft.AspNetCore.Mvc;
using ProductReviewApi.Services;
using ProductReviewApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ProductReviewApi.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        // Constructor injection of IProductService
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            // Fetch the product using the ProductService
            var product = await _productService.GetProductByIdAsync(id);

            // Check if the product is null (not found)
            if (product == null)
            {
                // Return 404 Not Found if the product is not found
                return NotFound($"Product with ID {id} not found.");
            }

            // Return the product with 200 OK if found
            return Ok(product);
        }

        // Optional: GET: api/products to retrieve all products
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }
    }
}
