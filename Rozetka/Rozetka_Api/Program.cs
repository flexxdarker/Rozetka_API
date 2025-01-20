using BusinessLogic.Exstensions;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Rozetka_Api.Helpers;
using System;

namespace Rozetka_Api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            

            // Add services to the container.
            var connStr = builder.Configuration.GetConnectionString("DefaultConnection")!;

            builder.Services.AddCustomServices();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext(connStr);
            builder.Services.AddCustomServices();
            builder.Services.AddRepositories();
            builder.Services.AddIdentity();

            var app = builder.Build();

            app.DataBaseMigrate();
            app.AddUploadingsFolder(Directory.GetCurrentDirectory());

            //using (var scope = app.Services.CreateScope())
            //{
            //    var serviceProvider = scope.ServiceProvider;
            //    serviceProvider.SeedCategories(builder.Configuration).Wait();
            //}

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseAuthorization();
            app.MapControllers();

            await app.SeedCategoriesAndFilters(builder.Configuration);
            await app.RunAsync();
        }
    }
}
       