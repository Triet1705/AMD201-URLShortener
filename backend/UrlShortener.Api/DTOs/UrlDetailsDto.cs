namespace UrlShortener.Api.DTOs
{
    public class UrlDetailsDto
    {
        public string ShortCode { get; set; } = string.Empty;
        public string LongUrl { get; set; } = string.Empty;
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAtUtc { get; set; }
    }
}
