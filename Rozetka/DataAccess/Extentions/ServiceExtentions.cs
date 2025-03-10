﻿using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using DataAccess.Data;
using DataAccess.Repositories;
using DataAccess.Repostories;
using Google;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System;

namespace DataAccess
{
    public static class ServiceExtentions
    {
        public static void AddDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<RozetkaDbContext>(opts => opts.UseNpgsql(connectionString));
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
        }

        public static void AddIdentity(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Stores.MaxLengthForKeys = 128;
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 5;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            })
                .AddEntityFrameworkStores<RozetkaDbContext>()
                .AddDefaultTokenProviders();
        }

        public static void DataBaseMigrate(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var serviceProvider = scope.ServiceProvider;
            var context = serviceProvider.GetRequiredService<RozetkaDbContext>();
            try
            {
                context.Database.Migrate();
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message + ex.Source);
            }
        }

        public static void AddUploadingsFolder(this WebApplication app, string CurrentDirectoryPath)
        {
            string imagesDirPath = Path.Combine(CurrentDirectoryPath, app.Configuration["DirImages"]!);

            if (!Directory.Exists(imagesDirPath))
            {
                Directory.CreateDirectory(imagesDirPath);
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(imagesDirPath),
                RequestPath = "/"+ app.Configuration["DirImages"]
            });
        }
    }
}