using Microsoft.AspNetCore.Mvc;
using UrlShortener.Application.Interfaces;
using UrlShortener.Domain.Entities;


namespace UrlShortener.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlsController : ControllerBase
    {
        private readonly IUrlShorteningService _service;
        public UrlsController(IUrlShorteningService service)
        {
            _service = service;
        }
        [HttpPost]
        public async Task<IActionResult> CreateShortUrl([FromBody] ShortenUrlRequest request)
        {
            var shortenedUrl = await _service.GenerateShortUrlAsync(request.LongUrl);

            var response = new ShortenedUrlResponse
            {
                ShortUrl = $"{Request.Scheme}://{Request.Host}/{shortenedUrl.ShortCode}",
            };
            return Ok(response);
        }

        [HttpGet("/{shortCode}")]
        public async Task<IActionResult> RedirectShortUrl(string shortCode)
        {
            var shortenedUrl = await _service.GetByShortCodeAsync(shortCode);

            if (shortenedUrl == null)
            {
                return NotFound("Short URL not found.");
            }
            return Redirect(shortenedUrl.LongUrl);
        }
    }
    public class ShortenUrlRequest
    {
        public string LongUrl { get; set; } = string.Empty;
    }


    public class ShortenedUrlResponse
    {
        public string ShortUrl { get; set; } = string.Empty;
    }
}
