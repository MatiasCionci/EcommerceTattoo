using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace EcommereceTattoo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MercadoPagoController : ControllerBase
    {
        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook()
        {
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
            // Aquí puedes guardar el body en base de datos o procesar el pago
            // Ejemplo: loguear la notificación
            Console.WriteLine($"Webhook recibido: {body}");
            // Puedes agregar lógica para actualizar el estado del pago según el contenido
            return Ok();
        }
    // Variables estáticas para almacenar el token y su expiración
    private static string? _accessToken = null;
    private static DateTime _tokenExpiration = DateTime.MinValue;
    private static readonly SemaphoreSlim _tokenLock = new SemaphoreSlim(1, 1);

    // Método para obtener el access token, renovando si está expirado
    private async Task<string?> GetAccessTokenAsync()
    {
        await _tokenLock.WaitAsync();
        try
        {
            if (_accessToken != null && DateTime.UtcNow < _tokenExpiration)
            {
                return _accessToken;
            }

            var clientId = "2645079204"; // Vendedor de prueba
            var clientSecret = "HbTw2asCtn"; // Vendedor de prueba
            var httpClient = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.mercadopago.com/oauth/token");
            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials"),
                new KeyValuePair<string, string>("client_id", clientId),
                new KeyValuePair<string, string>("client_secret", clientSecret)
            });
            request.Content = content;
            var response = await httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            using var doc = System.Text.Json.JsonDocument.Parse(json);
            _accessToken = doc.RootElement.GetProperty("access_token").GetString();
            var expiresIn = doc.RootElement.GetProperty("expires_in").GetInt32();
            _tokenExpiration = DateTime.UtcNow.AddSeconds(expiresIn - 60); // Renueva 1 min antes de expirar
            return _accessToken;
        }
        catch
        {
            _accessToken = null;
            _tokenExpiration = DateTime.MinValue;
            throw;
        }
        finally
        {
            _tokenLock.Release();
        }
    }
        [HttpPost("crear-preferencia")]
        public async Task<IActionResult> CrearPreferencia([FromBody] PlanPagoDto plan)
        {
            try
            {
                // Logs de depuración
                Console.WriteLine("--- INICIO CrearPreferencia ---");
                Console.WriteLine($"Datos recibidos: Nombre={plan.Nombre}, Precio={plan.Precio}");
                Console.WriteLine("Validando datos...");
                if (string.IsNullOrWhiteSpace(plan.Nombre) || plan.Precio <= 0)
                {
                    Console.WriteLine("Datos inválidos.");
                    return BadRequest(new { error = "Nombre y precio son obligatorios y deben ser válidos." });
                }

                var accessToken = "TEST-366861109015361-082203-e0e0c631843c2d1f323161a5c9816fde-1142110712"; // Access token de prueba correcto
                using var client = new HttpClient();
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

                var body = new
                {
                    items = new[] {
                        new {
                            title = plan.Nombre,
                            quantity = 1,
                            unit_price = plan.Precio,
                            description = "Mentoría online",
                            category_id = "services"
                        }
                    },
                    payer = new { email = "cioncimatias2@gmail.com" },
                    currency_id = "ARS",
                    back_urls = new {
                        success = "https://www.tusitio.com/pago-exitoso",
                        failure = "https://www.tusitio.com/pago-fallido",
                        pending = "https://www.tusitio.com/pago-pendiente"
                    },
                    notification_url = "https://www.tusitio.com/api/mercadopago/webhook"
                };

                var jsonBody = JsonSerializer.Serialize(body);
                var httpContent = new StringContent(jsonBody, Encoding.UTF8, "application/json");
                var response = await client.PostAsync("https://api.mercadopago.com/checkout/preferences", httpContent);
                var responseBody = await response.Content.ReadAsStringAsync();
                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"MercadoPago error: {responseBody}");
                    return BadRequest(responseBody);
                }

                using var doc = JsonDocument.Parse(responseBody);
                var initPoint = doc.RootElement.GetProperty("init_point").GetString();
                return Ok(new { init_point = initPoint });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("access-token")]
        public async Task<IActionResult> GetAccessToken()
        {
            string clientId = "2645079204"; // Vendedor de prueba
            string clientSecret = "HbTw2asCtn"; // Vendedor de prueba
            var client = new HttpClient();
            var body = new StringContent($"grant_type=client_credentials&client_id={clientId}&client_secret={clientSecret}", Encoding.UTF8, "application/x-www-form-urlencoded");
            var response = await client.PostAsync("https://api.mercadopago.com/oauth/token", body);
            var responseBody = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, responseBody);
            using var doc = JsonDocument.Parse(responseBody);
            var accessToken = doc.RootElement.GetProperty("access_token").GetString();
            return Ok(new { access_token = accessToken });
        }
    }

    public class PlanPagoDto
    {
        public string? Nombre { get; set; }
        public decimal Precio { get; set; }
    }
}
