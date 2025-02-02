using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Category;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.DTOs.User;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.CategoryModels;
using BusinessLogic.Models.UserModels;
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
                .ForMember(x => x.Values, opt => opt.MapFrom(z => z.Values.Select(y => y.ValueId)))
                .ForMember(x => x.FirstImage, opt => opt.MapFrom(x => x.Images.FirstOrDefault(x => x.Priority == 0).Name ?? "Error first image"));
                
            CreateMap<AdvertCreationModel, Advert>().ForMember(x => x.Values, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Category, CategoryDto>()
                .ForMember(x => x.Filters, opt => opt.MapFrom(z => z.Filters.Select(y => y.FilterId))).ReverseMap();

            CreateMap<Category, CategoryTreeDto>()
               .ForMember(x => x.Filters, opt => opt.MapFrom(z => z.Filters.Select(y => y.FilterId))).ReverseMap()
            .ForMember(x => x.SubCategories, opt => opt.MapFrom(x => x.SubCategories));

            CreateMap<CategoryCreateModel, Category>().ForMember(x => x.Filters, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Filter, FilterDto>()
                .ForMember(x => x.Values, opt =>
                opt.MapFrom(z => z.Values.Select(y => new FilterValueDto { Id = y.Id, FilterId = y.FilterId, Value = y.Value }).ToArray()));

            CreateMap<FilterValue, FilterValueDto>()
                .ForMember(x => x.FilterName, opt =>
                opt.MapFrom(z => z.Filter.Name));

            CreateMap<Image, ImageDto>().ReverseMap();

            CreateMap<CategoryFilter, CategoryFilterDto>().ReverseMap();
            CreateMap<CategoryFilter, CategoryFilterCreationModel>().ReverseMap();

            CreateMap<AdvertValue, AdvertValueDto>().ReverseMap();
            CreateMap<AdvertValue, AdvertValueCreationModel>().ReverseMap();


            CreateMap<RegisterModel, User>()
                .ForMember(x => x.UserName, opts => opts.MapFrom(s => s.Email));
        }
    }
}
