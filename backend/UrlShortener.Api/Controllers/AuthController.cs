using Microsoft.AspNetCore.Mvc;
using UrlShortener.Api.DTOs.Auths;
using UrlShortener.Application.Interfaces;

namespace UrlShortener.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto.Username, registerDto.Password);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Error });
            }

            return StatusCode(201, new { message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenDto>> Login([FromBody] UserLoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto.Username, loginDto.Password);

            if (!result.Success)
            {
                return Unauthorized(new { message = result.Error });
            }

            var responseDto = new TokenDto
            {
                Token = result.Token.Token,
                Expiration = result.Token.Expiration
            };

            return Ok(responseDto);
        }
    }
}