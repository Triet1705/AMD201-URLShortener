
using Microsoft.EntityFrameworkCore;
using UrlShortener.Application.Interfaces;
using UrlShortener.Infrastructure.Persistence;
using UrlShortener.Application.Services;
using Npgsql.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace UrlShortener.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
            builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            builder.Services.AddScoped<IUrlShorteningService, UrlShorteningService>();


            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddHttpClient();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Chibi Link API",
                    Version = "v1",
                    Description = "API for shortening URLs"
                });
            });
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });
            builder.Services.AddScoped<IUrlShorteningService, UrlShorteningService>();

            builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
                    };
                });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "UrlShortener.Api v1");
                });
            }

            app.UseHttpsRedirection();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
