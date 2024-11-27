using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Specifications;
using DataAccess.Repostories;
using System.Net;

namespace BusinessLogic.Services
{
    internal class CategoryService : ICategoryService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Category> categories;

        public CategoryService(IMapper mapper,
        IRepository<Category> categories)
        {
           this.mapper = mapper;
             this.categories = categories;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync() => mapper.Map<IEnumerable<CategoryDto>>(await categories.GetListBySpec(new CategorySpecs.GetAll()));
        public async Task<CategoryDto> GetByIdAsync(int id) => mapper.Map<CategoryDto>(await categories.GetItemBySpec(new CategorySpecs.GetById(id)));


    }
}
