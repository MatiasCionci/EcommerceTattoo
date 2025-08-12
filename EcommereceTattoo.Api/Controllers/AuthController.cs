using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommereceTattoo.Api.Data;
using EcommereceTattoo.Api.DTOs;
using EcommereceTattoo.Api.Models;
using System.Security.Cryptography;
using System.Text;

namespace EcommereceTattoo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("El email ya está registrado.");
            if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
                return BadRequest("El usuario ya existe.");

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = HashPassword(dto.Password)
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Usuario registrado correctamente" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || user.PasswordHash != HashPassword(dto.Password))
                return Unauthorized("Credenciales inválidas");

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("SuperSecretKey@12345678901234567890SuperSecretKey"); // Debe ir en appsettings
            var tokenDescriptor = new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new System.Security.Claims.Claim("id", user.Id.ToString()),
                    new System.Security.Claims.Claim("username", user.Username),
                    new System.Security.Claims.Claim("email", user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(
                    new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(key),
                    Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
