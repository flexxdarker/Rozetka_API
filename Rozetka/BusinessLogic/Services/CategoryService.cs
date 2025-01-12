using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Models;
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
        private readonly IRepository<Category> categoriesRepo;
        private readonly IFilterService filtersService;
        private readonly ICategoryFilterService categoryFiltersService;
        public CategoryService(IMapper mapper,
        IRepository<Category> categoriesRepo,
        IFilterService filtersService,
        ICategoryFilterService categoryFiltersService)
        {
            this.mapper = mapper;
            this.categoriesRepo = categoriesRepo;
            this.filtersService = filtersService;
            this.categoryFiltersService = categoryFiltersService;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync() 
        {
            return mapper.Map<IEnumerable<CategoryDto>>(await categoriesRepo.GetListBySpec(new CategorySpecs.GetAll()));
        }
        public async Task<IEnumerable<CategoryDto>> GetParentAsync() => mapper.Map<IEnumerable<CategoryDto>>(await categoriesRepo.GetListBySpec(new CategorySpecs.GetParent()));
        public async Task<IEnumerable<CategoryDto>> GetSubAsync(int parentId) => mapper.Map<IEnumerable<CategoryDto>>(await categoriesRepo.GetListBySpec(new CategorySpecs.GetSub(parentId)));
        public async Task<CategoryDto> GetByIdAsync(int id) => mapper.Map<CategoryDto>(await categoriesRepo.GetItemBySpec(new CategorySpecs.GetById(id)));

        public async Task<CategoryDto> CreateAsync(CategoryCreationModel categoryCreationModel)
        {
            var category = mapper.Map<Category>(categoryCreationModel);

            await categoriesRepo.InsertAsync(category);
            await categoriesRepo.SaveAsync();

            if (categoryCreationModel.Filters?.Any() ?? false) { 
                var filters = await filtersService.GetByIds(categoryCreationModel.Filters);
                await categoryFiltersService.CreateRangeAsync(category, filters);
            }
            return mapper.Map<CategoryDto>(category);
        }
    }
}
