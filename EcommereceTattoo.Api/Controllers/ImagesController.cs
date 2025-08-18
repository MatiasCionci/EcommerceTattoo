using Microsoft.AspNetCore.Mvc;
using EcommereceTattoo.Api.Services;

namespace EcommereceTattoo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly CloudinaryService _cloudinaryService = new CloudinaryService();

        [HttpGet("{folder}")]
        public IActionResult GetImages(string folder)
        {
            var images = _cloudinaryService.GetImagesByFolder(folder);
            return Ok(images.Select(img => new {
                url = img.Url,
                publicId = img.PublicId,
                tags = img.Tags
            }));
        }
    }
}
