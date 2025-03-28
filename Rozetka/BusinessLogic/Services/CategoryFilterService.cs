using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Specifications;
using DataAccess.Repositories;
using System.Net;

namespace BusinessLogic.Services
{
    internal class CategoryFilterService : ICategoryFilterService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Category> categoriesRepo;
        private readonly IRepository<CategoryFilter> categoryFiltersRepo;
        private readonly IFilterService filtersService;
        public CategoryFilterService(IMapper mapper,
        IRepository<Category> categoriesRepo,
        IFilterService filtersService,
        IRepository<CategoryFilter> categoryFiltersRepo)
        {
            this.mapper = mapper;
            this.categoriesRepo = categoriesRepo;
            this.filtersService = filtersService;
            this.categoryFiltersRepo = categoryFiltersRepo;
        }

        public async Task<IEnumerable<CategoryFilterDto>> GetAllAsync() { 
            return mapper.Map<IEnumerable<CategoryFilterDto>>(await categoryFiltersRepo.GetListBySpec(new CategoryFilterSpecs.GetAll()));
        }
        public async Task<CategoryFilterDto> CreateAsync(CategoryFilterCreationModel creationModel)
        {
            var categoryFilter = mapper.Map<CategoryFilter>(creationModel);
            await categoryFiltersRepo.InsertAsync(categoryFilter);
            await categoryFiltersRepo.SaveAsync();
            return mapper.Map<CategoryFilterDto>(categoryFilter);
        }

        public async Task<CategoryFilterDto> EditAsync(CategoryFilterCreationModel editModel)
        {
            var categoryFilter = await categoryFiltersRepo.GetItemBySpec(new CategoryFilterSpecs.GetByCategoryId(editModel.CategoryId));

            mapper.Map(editModel, categoryFilter);

            await categoryFiltersRepo.SaveAsync();
            return mapper.Map<CategoryFilterDto>(categoryFilter);
        }

        public async Task CreateRangeAsync(Category category, IEnumerable<FilterDto> filters)
        {
            var categoryFilters = new List<CategoryFilterDto>();
            foreach (var filter in filters) {
                categoryFilters.Add(new CategoryFilterDto { CategoryId = category.Id, FilterId = filter.Id });
            }
            await categoryFiltersRepo.AddRangeAsync(mapper.Map<IEnumerable<CategoryFilter>>(categoryFilters));
            await categoryFiltersRepo.SaveAsync();
        }

        public async Task<IEnumerable<CategoryFilterDto>> GetByCategoryIdAsync(int categoryId)
        {
            return mapper.Map<IEnumerable<CategoryFilterDto>>(await categoryFiltersRepo.GetListBySpec(new CategoryFilterSpecs.GetByCategoryId(categoryId)));
        }

        public async Task DeleteAsync(int categoryId)
        {
            var categoryFilters = mapper.Map<IEnumerable<CategoryFilterDto>>(await categoryFiltersRepo.GetListBySpec(new CategoryFilterSpecs.GetByCategoryId(categoryId)));
            foreach (var value in categoryFilters)
            {
                await categoryFiltersRepo.DeleteAsync(value.Id);
                await categoryFiltersRepo.SaveAsync();
            }
        }
    }
}
