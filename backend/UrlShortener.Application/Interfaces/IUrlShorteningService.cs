using UrlShortener.Domain.Entities;

namespace UrlShortener.Application.Interfaces
{
    public class UrlDetailsData
    {
        public string ShortCode { get; set; }
        public string LongUrl { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime CreatedAtUtc { get; set; }
    }
    public interface IUrlShorteningService
    {
        Task<ShortenedUrl> GenerateShortUrlAsync(string longUrl);
        Task<ShortenedUrl> GetByShortCodeAsync(string shortCode);
        Task<UrlDetailsData?> GetUrlDetailsAsync(string shortCode);
    }
}
