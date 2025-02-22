using System.Collections.Generic;
using System.Net;
using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Category;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Models.CategoryModels;
using BusinessLogic.Specifications;
using DataAccess.Repostories;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<CategoryTreeDto>> GetTreeAsync()
        {
            var categories = await categoriesRepo.GetListBySpec(new CategorySpecs.GetAll());
            return mapper.Map<IEnumerable<CategoryTreeDto>>(BuildTree(null, categories));
        }

        private IEnumerable<Category> BuildTree(int? parentId, IEnumerable<Category> categories)
        {
            return categories.AsParallel()
                .Where(c => c.ParentCategoryId == parentId)
                .Select(c =>
                {
                    c.SubCategories = BuildTree(c.Id, categories).ToList();
                    return c;
                });
        }
        public async Task<IEnumerable<CategoryDto>> GetParentAsync() => mapper.Map<IEnumerable<CategoryDto>>(await categoriesRepo.GetListBySpec(new CategorySpecs.GetParent()));
        public async Task<IEnumerable<CategoryDto>> GetSubAsync(int parentId) => mapper.Map<IEnumerable<CategoryDto>>(await categoriesRepo.GetListBySpec(new CategorySpecs.GetSub(parentId)));
        public async Task<CategoryDto> GetByIdAsync(int id) => mapper.Map<CategoryDto>(await categoriesRepo.GetItemBySpec(new CategorySpecs.GetById(id)));
        public async Task<CategoryTreeDto> GetByIdWithSubAsync(int id) {

            var category = await categoriesRepo.GetItemBySpec(new CategorySpecs.GetById(id));
            var categories = await categoriesRepo.GetListBySpec(new CategorySpecs.GetAll());
            return mapper.Map<CategoryTreeDto>(BuildSinglTree(category, categories));
        }
        private Category BuildSinglTree(Category category, IEnumerable<Category> allCategories)
        {
            category.SubCategories = allCategories
                .Where(c => c.ParentCategoryId == category.Id)
                .Select(c => BuildSinglTree(c, allCategories))
                .ToList();

            return category;
        }

        public async Task<CategoryDto> CreateAsync(CategoryCreateModel categoryCreateModel)
        {
            var category = mapper.Map<Category>(categoryCreateModel);

            if (categoryCreateModel.Image != null)
            {
                category.Image = await imageService.SaveImageAsync(categoryCreateModel.Image);
            }

            if (category.ParentCategoryId == category.Id)
            {
                throw new HttpException(Errors.CategoryCannotBeItsOwnParent, HttpStatusCode.BadRequest);
            }

            await categoriesRepo.InsertAsync(category);
            await categoriesRepo.SaveAsync();


            if (categoryCreateModel.Filters?.Any() ?? false) { 
                var filters = await filtersService.GetByIds(categoryCreateModel.Filters);
                await categoryFiltersService.CreateRangeAsync(category, filters);
            }
            return mapper.Map<CategoryDto>(category);
        }

        public async Task DeleteAsync(int id)
        {
            var category = await categoriesRepo.GetItemBySpec(new CategorySpecs.GetById(id));
            if (category != null)
            {
                if(category.SubCategories?.Any() ?? false) { 
                    foreach(var subCategory in category.SubCategories)
                    {
                        await DeleteAsync(subCategory.Id);
                    }    
                }
                await categoriesRepo.DeleteAsync(id);
                await categoriesRepo.SaveAsync();
                if (category.Image != null) {
                    imageService.DeleteImageIfExists(category.Image);
                }
            }
        }

        public async Task<CategoryDto> EditAsync(CategoryEditModel editModel)
        {
            var category = await categoriesRepo.GetItemBySpec(new CategorySpecs.GetById(editModel.Id));

            mapper.Map(editModel, category);

            if (editModel.ParentCategoryId.HasValue)
            {
                if (category.ParentCategoryId == category.Id)
                    throw new HttpException(Errors.CategoryCannotBeItsOwnParent, HttpStatusCode.BadRequest);

                var parentCategory = await categoriesRepo.GetItemBySpec(new CategorySpecs.GetById(editModel.ParentCategoryId.Value));
                category.ParentCategory = parentCategory;
            }

            if(editModel.Image != null)
            {
                if (!string.IsNullOrEmpty(category.Image))
                {
                    imageService.DeleteImageIfExists(category.Image);
                }

                category.Image = await imageService.SaveImageAsync(editModel.Image);
            }

            if (editModel.Filters?.Any() ?? false)
            {
                await categoryFiltersService.DeleteAsync(editModel.Id);
                foreach (var filter in editModel.Filters) 
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
