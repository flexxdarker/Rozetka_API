using BusinessLogic.Exstensions;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Rozetka_Api.Helpers;
using Shop_Api_PV221;
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

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddIdentity();
            //builder.Services.AddSwaggerGen();
            builder.Services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer",
                    new OpenApiSecurityScheme
                    {
                        Description = "Jwt Auth header using the Bearer scheme",
                        Type = SecuritySchemeType.Http,
                        Scheme = "bearer"
                    });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme
            {
                Reference=new OpenApiReference
                {
                    Id="Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            }, new List<string>()
        }
    });
            });


            builder.Services.AddJWT(builder.Configuration);

            builder.Services.AddDbContext(connStr); 
            builder.Services.AddCustomServices();
            builder.Services.AddRepositories();

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                scope.ServiceProvider.SeedRoles().Wait();
                scope.ServiceProvider.SeedAdmin().Wait();
            }

            app.DataBaseMigrate();
            app.AddUploadingsFolder(Directory.GetCurrentDirectory());

            //using (var scope = app.Services.CreateScope())
            //{
            //    var serviceProvider = scope.ServiceProvider;
            //    serviceProvider.SeedCategories(builder.Configuration).Wait();
            //}

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            await app.SeedCategoriesAndFilters(builder.Configuration);
            await app.RunAsync();
        }
    }
}
       