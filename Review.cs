using System.ComponentModel.DataAnnotations;

namespace ProductReviewApi.Models
{
public class Review
{
    public int ReviewId { get; set; }
    public int ProductId { get; set; }

    // Add 'required' modifier
    public required string ReviewerName { get; set; }  // or make it nullable: public string? ReviewerName { get; set; }

    // Similarly for other properties
    public required string Comment { get; set; }
    public required int Rating { get; set; }
    // To prevent warnings, make it nullable or add required.

}

}