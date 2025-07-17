using System.ComponentModel.DataAnnotations;

namespace UrlShortener.Domain.Entities
{
    public class ShortenedUrl
    {
        public long Id { get; set; }

        [Required]
        [MaxLength(2048)]
        public string LongUrl { get; set; }

        [Required]
        [MaxLength(7)]
        public string ShortCode { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedAtUtc { get; set; }

        public int ClickCount { get; set; }
    }
}
