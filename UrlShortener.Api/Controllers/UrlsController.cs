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
                ShortUrl = $"http://short-ly/{shortenedUrl.ShortCode}",
            };
            return Ok(response);
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
