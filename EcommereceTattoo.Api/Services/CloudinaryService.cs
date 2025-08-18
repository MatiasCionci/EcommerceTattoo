using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;

namespace EcommereceTattoo.Api.Services
{
    public class CloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService()
        {
            DotEnv.Load(options: new DotEnvOptions(probeForEnv: true));
            _cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
            _cloudinary.Api.Secure = true;
        }

        public ImageUploadResult UploadImage(string filePath)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(filePath),
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = true
            };
            return _cloudinary.Upload(uploadParams);
        }

        public List<Resource> GetImagesByFolder(string folder)
        {
            var allResources = new List<Resource>();
            string nextCursor = null;
            do
            {
                var listParams = new ListResourcesParams()
                {
                    ResourceType = ResourceType.Image,
                    NextCursor = nextCursor
                };
                var result = _cloudinary.ListResources(listParams);
                allResources.AddRange(result.Resources);
                nextCursor = result.NextCursor;
            } while (!string.IsNullOrEmpty(nextCursor));
            return allResources;
        }
    }
}
