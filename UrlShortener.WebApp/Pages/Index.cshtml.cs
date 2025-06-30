using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace UrlShortener.WebApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IHttpClientFactory _httpClientFactory;

        [BindProperty(SupportsGet = true)] 
        [Required(ErrorMessage = "Vui lòng nhập URL.")]
        [Url(ErrorMessage = "URL không hợp lệ.")]
        public string LongUrl { get; set; } = string.Empty;

        [BindProperty]
        public bool IsCustom { get; set; } 

        [BindProperty]
        public string? CustomCode { get; set; } 

        // --- Thuộc tính để giữ kết quả trả về cho UI ---
        public string? ShortenedUrlResult { get; private set; }


        // Inject IHttpClientFactory để tạo HttpClient một cách an toàn
        public IndexModel(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page(); 
            }

            var httpClient = _httpClientFactory.CreateClient();

            var apiRequest = new { LongUrl = this.LongUrl }; 

            var apiEndpoint = "https://localhost:7037/api/urls";

            var httpResponse = await httpClient.PostAsJsonAsync(apiEndpoint, apiRequest);

            if (httpResponse.IsSuccessStatusCode)
            {
                var apiResponse = await httpResponse.Content.ReadFromJsonAsync<ShortenedUrlResponse>();

                ShortenedUrlResult = apiResponse?.ShortUrl;
            }
            else
            {
                ShortenedUrlResult = "Error: Could not shorten URL.";
            }
            return Page();
        }
    }

    public class ShortenedUrlResponse
    {
        public string ShortUrl { get; set; } = string.Empty;
    }
}