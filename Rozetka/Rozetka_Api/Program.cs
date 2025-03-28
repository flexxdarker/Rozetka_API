using BusinessLogic.Exstensions;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Rozetka_Api.Helpers;
using Rozetka_Api;
using System;
using Microsoft.Extensions.FileProviders;

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
            builder.Services.AddIdentity();
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
            builder.Services.AddValidationServices();
            builder.Services.AddRepositories();

            var app = builder.Build();

            app.DataBaseMigrate();
            
            app.AddUploadingsFolder(Directory.GetCurrentDirectory());

            app.UseCors(options =>
            {
                options
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowAnyOrigin();
            });

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            using (var scope = app.Services.CreateScope())
            {
                scope.ServiceProvider.SeedRoles().Wait();
                scope.ServiceProvider.SeedAdmin().Wait();
            }

            await app.SeedStatuses(builder.Configuration);
            await app.SeedFilters(builder.Configuration);
            await app.SeedCategories(builder.Configuration);
            await app.SeedCategoryFilters(builder.Configuration);
            await app.SeedAdverts(builder.Configuration);
            await app.SeedAdvertValues(builder.Configuration);
            await app.RunAsync();
        }
    }
}
       
