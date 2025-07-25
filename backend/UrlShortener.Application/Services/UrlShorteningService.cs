﻿using Microsoft.EntityFrameworkCore;
using System;
using UrlShortener.Application.Interfaces;
using UrlShortener.Domain.Entities;

namespace UrlShortener.Application.Services
{
    public class UrlShorteningService : IUrlShorteningService
    {
        private readonly IApplicationDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;

        public UrlShorteningService(IApplicationDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<ShortenedUrl> GenerateShortUrlAsync(string longUrl)
        {
            if (!await IsUrlReachable(longUrl))
            {
                throw new ArgumentException("The provided URL is not reachable or does not exist.");
            }
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
        private async Task<bool> IsUrlReachable (string longurl)
        {
            if (!Uri.TryCreate(longurl, UriKind.Absolute, out var validatedUri))
            {
                return false;
            }

            try
            {
                var client = _httpClientFactory.CreateClient();
                client.Timeout = TimeSpan.FromSeconds(5);

                var request = new HttpRequestMessage(HttpMethod.Head, validatedUri);
                var response = await client.SendAsync(request);

                return response.IsSuccessStatusCode;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<UrlDetailsData?> GetUrlDetailsAsync(string shortCode)
        {
            var shortenedUrl = await _context.ShortenedUrls
                .FirstOrDefaultAsync(u => u.ShortCode == shortCode);

            if (shortenedUrl == null) return null;

            var client = _httpClientFactory.CreateClient();
            var html = await client.GetStringAsync(shortenedUrl.LongUrl);

            var htmlDoc = new HtmlAgilityPack.HtmlDocument();
            htmlDoc.LoadHtml(html);

            var title = htmlDoc.DocumentNode.SelectSingleNode("//meta[@property='og:title']")
                ?.GetAttributeValue("content", "");

            var description = htmlDoc.DocumentNode.SelectSingleNode("//meta[@property='og:description']")
                ?.GetAttributeValue("content", "");

            var imageUrl = htmlDoc.DocumentNode.SelectSingleNode("//meta[@property='og:image']")
                ?.GetAttributeValue("content", "");

            return new UrlDetailsData
            {
                ShortCode = shortenedUrl.ShortCode,
                LongUrl = shortenedUrl.LongUrl,
                CreatedAtUtc = shortenedUrl.CreatedAtUtc,
                Title = title,
                Description = description,
                ImageUrl = imageUrl
            };
        }
        //Redirect(Jukain)
        public async Task<ShortenedUrl?> GetByShortCodeAsync(string shortCode)
        {
            return await _context.ShortenedUrls.FirstOrDefaultAsync(u => u.ShortCode == shortCode);
        }
    }
}