using Microsoft.AspNetCore.Mvc;
using EcommereceTattoo.Api.Models;
using System.Net.Mail;
using System.Net;
using EcommereceTattoo.Api.Services;
using Microsoft.Extensions.Configuration;

namespace EcommereceTattoo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly IConfiguration _config;

        public AppointmentController(IConfiguration config)
        {
            _config = config;
            _emailService = new EmailService(_config);
        }

        [HttpPost]
        public IActionResult Post([FromBody] AppointmentRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Phone) ||
                string.IsNullOrWhiteSpace(request.Idea) ||
                string.IsNullOrWhiteSpace(request.Date) ||
                string.IsNullOrWhiteSpace(request.Turno))
            {
                return BadRequest("Todos los campos son obligatorios.");
            }

            var smtpSection = _config.GetSection("Smtp");
            var toEmail = smtpSection["To"];
            var subject = "Nueva cita de tatuaje";
            var body = $"Email: {request.Email}\nTeléfono: {request.Phone}\nIdea: {request.Idea}\nFecha: {request.Date}\nTurno: {request.Turno}";

            try
            {
                _emailService.SendAppointmentEmail(toEmail, subject, body);
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error enviando mail: {ex.Message}");
            }
        }
    }
}
