using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UrlShortener.Application.Interfaces;
using UrlShortener.Domain.Entities;
using BC = BCrypt.Net.BCrypt; 

namespace UrlShortener.Application.Services
{

    public class AuthService : IAuthService
    {
        private readonly IApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(IApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResult> RegisterAsync(string username, string password)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Username == username);
            if (userExists)
            {
                return new AuthResult { Success = false, Error = "Username already exists." };
            }

            var passwordHash = BC.HashPassword(password);

            var user = new User
            {
                Username = username,
                PasswordHash = passwordHash
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new AuthResult { Success = true };
        }

        public async Task<AuthResult> LoginAsync(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null || !BC.Verify(password, user.PasswordHash))
            {
                return new AuthResult { Success = false, Error = "Invalid username or password." };
            }

            var tokenData = GenerateJwtToken(user);

            return new AuthResult { Success = true, Token = tokenData };
        }

        private TokenData GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]!);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username), 
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), 
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())  
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),  
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return new TokenData { Token = tokenString, Expiration = token.ValidTo };
        }
    }
}