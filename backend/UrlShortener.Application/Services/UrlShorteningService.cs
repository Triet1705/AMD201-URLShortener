using Microsoft.EntityFrameworkCore;
using UrlShortener.Application.Interfaces;
using UrlShortener.Domain.Entities;

namespace UrlShortener.Application.Services
{
    public class UrlShorteningService : IUrlShorteningService
    {
        private readonly IApplicationDbContext _context;

        public UrlShorteningService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ShortenedUrl> GenerateShortUrlAsync(string longUrl)
        {
            string shortCode;
            while (true)
            {
                shortCode = GenerateRandomString(7);
                var codeExists = await _context.ShortenedUrls.AnyAsync(s => s.ShortCode == shortCode);
                if (!codeExists)
                {
                    break;
                }
            }
            var shortenedUrl = new ShortenedUrl
            {
                LongUrl = longUrl,
                ShortCode = shortCode,
                CreatedAtUtc = DateTime.UtcNow
            };

            await _context.ShortenedUrls.AddAsync(shortenedUrl);
            await _context.SaveChangesAsync();

            return shortenedUrl;
        }
        private string GenerateRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

            //Redirect(Jukain)
        public async Task<ShortenedUrl?> GetByShortCodeAsync(string shortCode)
        {
            return await _context.ShortenedUrls.FirstOrDefaultAsync(u => u.ShortCode == shortCode);
        }
    }
}