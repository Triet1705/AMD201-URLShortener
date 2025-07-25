﻿using System.ComponentModel.DataAnnotations;

namespace UrlShortener.Api.DTOs.Auths
{
    public class UserRegisterDto
    {
        [Required]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MinLength(6)] 
        public string Password { get; set; } = string.Empty;
    }
}
