using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;

namespace EcommereceTattoo.Api.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendAppointmentEmail(string to, string subject, string body)
        {
            var smtpSection = _config.GetSection("Smtp");
            var host = smtpSection["Host"];
            var port = int.Parse(smtpSection["Port"]);
            var user = smtpSection["User"];
            var pass = smtpSection["Pass"];
            var from = smtpSection["From"];

            var mail = new MailMessage(from, to, subject, body);
            var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(user, pass),
                EnableSsl = true
            };
            client.Send(mail);
        }
    }
}
