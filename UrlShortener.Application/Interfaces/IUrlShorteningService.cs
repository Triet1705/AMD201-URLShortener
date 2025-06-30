using UrlShortener.Domain.Entities;

namespace UrlShortener.Application.Interfaces
{
    public interface IUrlShorteningService
    {
        Task<ShortenedUrl> GenerateShortUrlAsync(string longUrl);
        Task<ShortenedUrl> GetByShortCodeAsync(string shortCode);
    }
}
