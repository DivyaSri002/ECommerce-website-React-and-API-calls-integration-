namespace ProductReviewApi.Models{
    public class Product
{
    public required int ProductId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public required string? ImageUrl1 { get; set; }
    public required string? ImageUrl2 { get; set; }
    public required string? ImageUrl3 { get; set; }
    public required string Category { get; set; }
    public int Stock { get; set; }
}
}