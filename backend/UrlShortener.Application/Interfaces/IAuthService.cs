namespace UrlShortener.Application.Interfaces
{
    public class TokenData
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }

    public class AuthResult
    {
        public bool Success { get; set; }
        public string Error { get; set; } = string.Empty;
        public TokenData? Token { get; set; }  
    }

    public interface IAuthService   
    {
        Task<AuthResult> RegisterAsync(string username, string password);
        Task<AuthResult> LoginAsync(string username, string password);
    }
}