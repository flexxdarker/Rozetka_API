using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Cart;
using BusinessLogic.DTOs.Category;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.DTOs.Order;
using BusinessLogic.Enities;
using BusinessLogic.Entities;
using BusinessLogic.Entities.Filter;
using BusinessLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BusinessLogic.Profiles
{
    public class ApplicationProfile : Profile
    {
        public ApplicationProfile(/*IFileService fileService*/)
        {

            CreateMap<Advert, AdvertDto>()
                .ForMember(x => x.CategoryName, opt => opt.MapFrom(x => x.Category.Name))
                .ForMember(x => x.FirstImage, opt => opt.MapFrom(x => x.Images.FirstOrDefault(x => x.Priority == 0).Name ?? "Error first image"));

            CreateMap<AdvertDto, Advert>();
            //CreateMap<AdvertCreationModel, Advert>();

            CreateMap<Category, CategoryDto>().ReverseMap();

            CreateMap<Filter, FilterDto>()
                .ForMember(x => x.Values, opt =>
                opt.MapFrom(z => z.Values.Select(y => new FilterValueDto { Id = y.Id, FilterId = y.FilterId, Value = y.Value }).ToArray()));

            CreateMap<FilterValue, FilterValueDto>()
                .ForMember(x => x.FilterName, opt =>
                opt.MapFrom(z => z.Filter.Name));

            CreateMap<Image, ImageDto>().ReverseMap();

            CreateMap<Basket, BasketDto>();
            CreateMap<BasketDto, Basket>();

            CreateMap<Order, OrderDto>();
            CreateMap<OrderDto, Order>();
        }
    }
}
