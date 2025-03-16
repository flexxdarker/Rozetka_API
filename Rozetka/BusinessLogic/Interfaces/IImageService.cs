using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IImageService
    {
        Task<string> SaveImageAsync(byte[] bytes);
        Task<string> SaveImageAsync(IFormFile image);
        Task<string> SaveImageAsync(string base64);
        Task<string> SaveImageFromUrlAsync(string url);
        Task<List<string>> SaveImagesAsync(IEnumerable<byte[]> bytesArrays);
        Task<List<string>> SaveImagesAsync(IEnumerable<IFormFile> images);
        Task<byte[]> LoadBytesAsync(string name);
        void DeleteImage(string nameWithFormat);
        void DeleteImageIfExists(string nameWithFormat);
        void DeleteImages(IEnumerable<string> images);
        void DeleteImagesIfExists(IEnumerable<string> images);
    }
}
