using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Models;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Specifications;
using DataAccess.Repostories;

namespace BusinessLogic.Services
{
    internal class CategoryService : ICategoryService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Category> categoriesRepo;
        private readonly IFilterService filtersService;
        private readonly IImageService imageService;
        private readonly ICategoryFilterService categoryFiltersService;
        public CategoryService(IMapper mapper,
        IRepository<Category> categoriesRepo,
        IFilterService filtersService,
        ICategoryFilterService categoryFiltersService,
        IImageService imageService)
        {
            this.mapper = mapper;
            this.categoriesRepo = categoriesRepo;
            this.filtersService = filtersService;
            this.categoryFiltersService = categoryFiltersService;
            this.imageService = imageService;
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

        public async Task DeleteAsync(int id)
        {
            var category = await categoriesRepo.GetItemBySpec(new CategorySpecs.GetById(id));
            if (category != null)
            {
                await categoriesRepo.DeleteAsync(id);
                await categoriesRepo.SaveAsync();
                if (category.Image != null) {
                    imageService.DeleteImageIfExists(category.Image);
                }
            }
        }

        public async Task<CategoryDto> EditAsync(CategoryCreationModel editModel)
        {
            var category = await categoriesRepo.GetItemBySpec(new CategorySpecs.GetById(editModel.Id));

            mapper.Map(editModel, category);

            if (editModel.ParentCategoryId.HasValue)
            {
                var parentCategory = await categoriesRepo.GetItemBySpec(new CategorySpecs.GetById(editModel.ParentCategoryId.Value));
                category.ParentCategory = parentCategory;
            }

            if (editModel.Filters?.Any() ?? false)
            {
               foreach(var filter in editModel.Filters) 
               {
                   await categoryFiltersService.CreateAsync(new CategoryFilterCreationModel { CategoryId = editModel.Id, FilterId = filter });
               }
            }
            else category.Filters.Clear();

            await categoriesRepo.SaveAsync();
            return mapper.Map<CategoryDto>(category);
        }
    }
}
