﻿using BusinessLogic.Interfaces;
using BusinessLogic.Services;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Linq.Expressions;
using System.Security.Claims;
using DataAccess.Repositories;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Validators;
using BusinessLogic.Entities;

namespace BusinessLogic.Exstensions
{
    public static class ServiceExtentions
    {
        public static void AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }
        public static void AddCustomServices(this IServiceCollection services)
        {
           
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICategoryFilterService, CategoryFilterService>();
            services.AddScoped<IFilterService, FilterService>();
            services.AddScoped<IAdvertService, AdvertService>();
            services.AddScoped<IAdvertValueService, AdvertValueService>();
            services.AddScoped<IBasketService, BasketService>();
            services.AddScoped<IAccountsService, AccountsService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IAccountsService, AccountsService>();
            services.AddScoped<ISmtpService, SmtpService>();
            services.AddScoped<IFilterValueService, FilterValueService>();
            services.AddScoped<IAdvertRatingService, AdvertRatingService>();
        }
        public static void AddValidationServices(this IServiceCollection services)
        { 
            services.AddScoped<IValidator<AdvertRatingCreateModel>, AdvertRatingCreateModelValidator>();
            services.AddScoped<IValidator<AdvertCreateModel>, AdvertCreateModelValidator>();
            services.AddScoped<IValidator<Advert>, AdvertValidator>();
            
        }
    }
}
