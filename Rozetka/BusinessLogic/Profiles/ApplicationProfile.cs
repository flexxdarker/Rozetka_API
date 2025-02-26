using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.AdvertValue;
using BusinessLogic.DTOs.Category;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.DTOs.User;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.CategoryModels;
using BusinessLogic.Models.FilterModels;
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
        public ApplicationProfile()
        {

            CreateMap<Advert, AdvertDto>()
                .ForMember(x => x.Values, opt => opt.MapFrom(z => z.Values.Select(y => y.ValueId)));

            CreateMap<Advert, AdvertPrintDto>()
                .ReverseMap();

            CreateMap<AdvertCreateModel, Advert>()
                .ForMember(x => x.Values, opt => opt.Ignore())
                .ForMember(x => x.Price, opt => opt.Ignore())
                .ForMember(x => x.Discount, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<AdvertEditModel, Advert>()
                .ForMember(x => x.Values, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Category, CategoryDto>()
                .ForMember(x => x.Filters, opt => opt.MapFrom(z => z.Filters.Select(y => y.FilterId)))
                .ReverseMap();

            CreateMap<Category, CategoryTreeDto>()
                .ForMember(x => x.Filters, opt => opt.MapFrom(z => z.Filters.Select(y => y.FilterId)))
                .ForMember(x => x.SubCategories, opt => opt.MapFrom(x => x.SubCategories))
                .ReverseMap();

            CreateMap<CategoryCreateModel, Category>()
                .ForMember(x => x.Filters, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<CategoryEditModel, Category>()
                .ForMember(x => x.Filters, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<FilterCreateModel, Filter>()
                .ForMember(x => x.Values, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<FilterEditModel, Filter>()
                .ForMember(x => x.Values, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<Filter, FilterDto>()
                .ForMember(x => x.Values, opt =>
                opt.MapFrom(z => z.Values.Select(y => new FilterValueDto { Id = y.Id, FilterId = y.FilterId, Value = y.Value })
                .ToArray()));

            CreateMap<FilterValue, FilterValueDto>()
                .ForMember(x => x.FilterName, opt => opt.MapFrom(z => z.Filter.Name))
                .ReverseMap();

            CreateMap<FilterValueCreationModel, FilterValue>()
                .ReverseMap();

            CreateMap<Image, ImageDto>()
                .ReverseMap();

            CreateMap<CategoryFilter, CategoryFilterDto>()
                .ReverseMap();
            CreateMap<CategoryFilter, CategoryFilterCreationModel>()
                .ReverseMap();

            CreateMap<AdvertValue, AdvertValueDto>()
                .ReverseMap();

            CreateMap<AdvertValue, AdvertValuePrintDto>()
                .ForMember(x => x.FilterName, opt => opt.MapFrom(z => z.Value.Filter.Name))
                .ForMember(x => x.ValueName, opt => opt.MapFrom(z => z.Value.Value))
                .ReverseMap();

            CreateMap<AdvertValue, AdvertValueCreationModel>()
                .ReverseMap();


            //CreateMap<RegisterModel, User>()
            //    .ForMember(x => x.UserName, opts => opts.MapFrom(s => s.Email))
            //    .ForMember(x => x.RoleId, opts => opts.MapFrom(_ => 2));

            CreateMap<User, LoginModel>().ReverseMap();

            CreateMap<RegisterModel, User>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.SurName, opt => opt.MapFrom(src => src.Surname))
            .ForMember(dest => dest.UserRoles, opt => opt.Ignore()); // Assuming UserRoles will be handled separately

            CreateMap<User, RegisterModel>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Surname, opt => opt.MapFrom(src => src.SurName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.Ignore());

            CreateMap<User, UserViewDto>()
            .ForMember(dest => dest.LockoutEnabled, opt => opt.MapFrom(src => src.LockoutEnabled))
            .ForMember(dest => dest.LockoutEnd, opt => opt.MapFrom(src => src.LockoutEnd))
            .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => GetRoleFromUserEntity(src)));

            CreateMap<UserViewDto, User>()
            .ForMember(dest => dest.UserRoles, opt => opt.MapFrom(src => src.Roles));


            CreateMap<UserEditDto, User>()
           .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
           .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FirstName))
           .ForMember(dest => dest.SurName, opt => opt.MapFrom(src => src.LastName))
           .ForMember(dest => dest.UserRoles, opt => opt.Ignore());

            CreateMap<User, UserEditDto>()
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.SurName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
        }

        private string GetRoleFromUserEntity(User userEntity)
        {
            string result = "";
            foreach (var role in userEntity.UserRoles)
            {
                result += role.Role.Name + " ";
            }

            // Отримання ролі з UserEntity         
            return result;
        }
    }
}
