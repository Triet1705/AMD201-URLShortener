using Microsoft.AspNetCore.Mvc;
using UrlShortener.Application.Interfaces;

namespace UrlShortener.Api.Controllers
{
    [ApiController]
    public class RedirectController : ControllerBase
    {
        private readonly IUrlShorteningService _service;

        public RedirectController(IUrlShorteningService service)
        {
            _service = service;
        }

        [HttpGet("/{shortCode}")]
        public async Task<IActionResult> RedirectShortUrl(string shortCode)
        {
            var urlDetails = await _service.GetUrlDetailsAsync(shortCode);

            if  (urlDetails == null)
            {
                return NotFound("Short URL not found.");
            }
            return RedirectPermanent(urlDetails.LongUrl);
        }
    }
}
