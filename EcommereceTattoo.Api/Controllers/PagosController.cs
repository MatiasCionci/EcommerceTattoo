using Microsoft.AspNetCore.Mvc;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Preference;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcommereceTattoo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagosController : ControllerBase
    {
        public PagosController()
        {
            // Configura tu Access Token de prueba
            MercadoPagoConfig.AccessToken = "TEST-366861109015361-082203-e0e0c631843c2d1f323161a5c9816fde-1142110712";
        }

        [HttpPost("crear-preferencia")]
        public async Task<IActionResult> CrearPreferencia()
        {
            var client = new PreferenceClient();

            var request = new PreferenceRequest
            {
                Items = new List<PreferenceItemRequest>
                {
                    new PreferenceItemRequest
                    {
                        Title = "Mentoría Tattoo",
                        Quantity = 1,
                        CurrencyId = "ARS",
                        UnitPrice = 29999m
                    }
                },
                BackUrls = new PreferenceBackUrlsRequest
                {
                    Success = "https://www.tusitio.com/pago-exitoso",
                    Failure = "https://www.tusitio.com/pago-fallido",
                    Pending = "https://www.tusitio.com/pago-pendiente"
                },
                AutoReturn = "approved",
                NotificationUrl = "https://www.tusitio.com/api/mercadopago/webhook",
                BinaryMode = true
            };

            Preference preference = await client.CreateAsync(request);

            return Ok(new { preferenceId = preference.Id });
        }
    }
}
