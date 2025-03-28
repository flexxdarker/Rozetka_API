﻿using AutoMapper;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;
using System.Net;
using EntityImage = BusinessLogic.Entities.Image;

namespace BusinessLogic.Services
{
    internal class ImageService : IImageService
    {
        private readonly IMapper mapper;
        private readonly IConfiguration config;
        private readonly IRepository<EntityImage> images;
        private readonly string imgPath;

        public ImageService(
            IMapper mapper,
            IConfiguration config, 
            IRepository<EntityImage> images)
        {
            this.mapper = mapper;
            this.config = config;
            this.images = images;
            imgPath = Path.Combine(Directory.GetCurrentDirectory(), config["DirImages"] ?? string.Empty);
        }

        public async Task<string> SaveImageAsync(IFormFile image)
        {
            using MemoryStream ms = new();
            await image.CopyToAsync(ms);
            string fileName = await SaveImageAsync(ms.ToArray());
            return fileName;
        }

        public async Task<List<string>> SaveImagesAsync(IEnumerable<IFormFile> images)
        {
            List<string> result = new();

            try
            {
                foreach (var image in images)
                {
                    result.Add(await SaveImageAsync(image));
                }
            }
            catch (Exception)
            {
                result.ForEach(DeleteImageIfExists);
                throw new HttpException("Error image save", HttpStatusCode.InternalServerError);
            }

            return result;
        }

        public async Task<string> SaveImageAsync(string base64)
        {
            if (base64.Contains(','))
                base64 = base64.Split(',')[1];

            var bytes = Convert.FromBase64String(base64);

            var fileName = await SaveImageAsync(bytes);

            return fileName;
        }

        public async Task<string> SaveImageAsync(byte[] bytes)
        {
            List<int> sizes = config.GetRequiredSection("ImageSizes").Get<List<int>>()
                ?? throw new Exception("ImageSizes reading error");

            if (sizes.Count == 0)
                throw new Exception("ImageSizes not inicialized");

            string imageName = $"{Path.GetRandomFileName()}.webp";

            var tasks = sizes
                .Select(s => SaveImageAsync(bytes, imageName, s))
                .ToArray();

            await Task.WhenAll(tasks);

            return imageName;
        }

        private async Task SaveImageAsync(byte[] bytes, string name, int size)
        {
            string dirSaveImage = Path.Combine(imgPath, $"{size}_{name}");

            using (var image = Image.Load(bytes))
            {
                image.Mutate(imageProcessingContext =>
                {
                    imageProcessingContext.Resize(new ResizeOptions
                    {
                        Size = new Size(Math.Min(image.Width, size), Math.Min(image.Height, size)),
                        Mode = ResizeMode.Max
                    });
                });

                using var stream = File.Create(dirSaveImage);
                await image.SaveAsync(stream, new WebpEncoder());
            }
        }

        public async Task<List<string>> SaveImagesAsync(IEnumerable<byte[]> bytesArrays)
        {
            List<string> result = new();

            try
            {
                foreach (var bytes in bytesArrays)
                {
                    result.Add(await SaveImageAsync(bytes));
                }
            }
            catch (Exception)
            {
                result.ForEach(DeleteImageIfExists);
                throw new HttpException("Error image save", HttpStatusCode.InternalServerError);
            }

            return result;
        }

        public async Task<byte[]> LoadBytesAsync(string name)
        {
            return await File.ReadAllBytesAsync(Path.Combine(imgPath, name));
        }
        

        public void DeleteImage(string nameWithFormat)
        {
            foreach (var size in Sizes)
            {
                File.Delete(Path.Combine(imgPath, $"{size}_{nameWithFormat}"));
            }
        }

        public void DeleteImages(IEnumerable<string> images)
        {
            foreach (var image in images)
                DeleteImage(image);
        }

        public void DeleteImageIfExists(string nameWithFormat)
        {
            foreach (var size in Sizes)
            {
                var path = Path.Combine(imgPath, $"{size}_{nameWithFormat}");
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
            }
        }

        public void DeleteImagesIfExists(IEnumerable<string> images)
        {
            foreach (var image in images)
                DeleteImageIfExists(image);
        }

        public async Task<string> SaveImageFromUrlAsync(string url)
        {
            using var httpClient = new HttpClient();
            var imageBytes = await httpClient.GetByteArrayAsync(url);
            return await SaveImageAsync(imageBytes);
        }

        private List<int> Sizes
        {
            get
            {
                List<int> sizes = config.GetRequiredSection("ImageSizes").Get<List<int>>()
                ?? throw new HttpException("ImageSizes reading error",HttpStatusCode.InternalServerError);

                if (sizes.Count == 0)
                    throw new HttpException("ImageSizes not inicialized",HttpStatusCode.InternalServerError);
                return sizes;
            }
        }
    }
}
