using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Enities;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using DataAccess.Entities;
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
        //public ApplicationProfile(IFileService fileService)
        //{
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
        //}
    }
}
