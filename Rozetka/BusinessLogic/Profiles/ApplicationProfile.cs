using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Models;
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
            //    //CreateMap<FilmDto, Film>()
            //    //    .ForMember(x => x.Category, opt => opt.Ignore());
            //    //CreateMap<Film, FilmDto>();
            //    //CreateMap<CreateFilmModel, Film>();
            //    ////.ForMember(x => x.ImageUrl, opt => opt.MapFrom(src => fileService.SaveFilmImage(src.ImageUrl).Result));

            //    //CreateMap<RegisterModel, User>()
            //    //    .ForMember(x => x.UserName, opts => opts.MapFrom(s => s.Email));

            //    //CreateMap<SessionDto, Session>()
            //    //    .ForMember(x => x.CinemaHall, opt => opt.Ignore())
            //    //    .ForMember(x => x.Film, opt => opt.Ignore());
            //    //CreateMap<Session, SessionDto>();
            //    //CreateMap<CreateSessionModel, Session>();

            //    //CreateMap<Category, CategoryDto>();
            //    //CreateMap<CategoryDto, Category>();

            //    //CreateMap<Company, CompanyDto>();
            //    //CreateMap<CompanyDto, Company>();

            CreateMap<Advert, AdvertDto>()
                .ForMember(x => x.CategoryName, opt => opt.MapFrom(x => x.Category.Name))
                .ForMember(x => x.FirstImage, opt => opt.MapFrom(x => x.Images.FirstOrDefault(x => x.Priority == 0).Name ?? "Error first image"));

            CreateMap<AdvertDto, Advert>();
            //CreateMap<AdvertCreationModel, Advert>();

            CreateMap<Category, CategoryDto>()
                .ForMember(x => x.Filters, opt => opt.MapFrom(z => z.Filters.Select(y => y.FilterId))).ReverseMap();
            //.ForMember(x => x.SubCategories, opt => opt.MapFrom(x => x.SubCategories));

            //CreateMap<Int32, Int32>();

            //CreateMap<int, CategoryFilter>()
            //.ForMember(dest => dest.FilterId, opt => opt.MapFrom(src => src))
            //.ReverseMap();

            CreateMap<CategoryCreationModel, Category>().ForMember(x => x.Filters, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Filter, FilterDto>()
                .ForMember(x => x.Values, opt =>
                opt.MapFrom(z => z.Values.Select(y => new FilterValueDto { Id = y.Id, FilterId = y.FilterId, Value = y.Value }).ToArray()));

            CreateMap<FilterValue, FilterValueDto>()
                .ForMember(x => x.FilterName, opt =>
                opt.MapFrom(z => z.Filter.Name));

            CreateMap<Image, ImageDto>().ReverseMap();

            CreateMap<CategoryFilter, CategoryFilterDto>().ReverseMap();

        }
    }
}
