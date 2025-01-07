
using BusinessLogic.Interfaces;
using DataAccess.Repostories;
using Rozetka_Api.Models.CategoryConfigModels;
using Bogus;
using static Rozetka_Api.Models.CategoryConfigModels.CategorySeedModel;
using Bogus.DataSets;
using BusinessLogic.Specifications;
using System.Linq;
using BusinessLogic.Entities;

namespace Rozetka_Api.Helpers
{
    public static class Seeder
    {
        public static async Task SeedCategories(this IServiceProvider app, IConfiguration config)
        {
            using var scope = app.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var imageService = scope.ServiceProvider.GetService<IImageService>()
                ?? throw new NullReferenceException("IImageService");
            var filterService = scope.ServiceProvider.GetService<IFilterService>()
                ?? throw new NullReferenceException("IFilterService");
            var categoriesRepo = scope.ServiceProvider.GetService<IRepository<Category>>()
                ?? throw new NullReferenceException("IRepository<Category>");
            var filtersRepo = scope.ServiceProvider.GetService<IRepository<Filter>>()
                ?? throw new NullReferenceException("IRepository<Filter>");
            using var httpClient = new HttpClient();

            var fakeFilters = config.GetSection("Filters").Get<FilterSeedModel[]>()
                    ?? throw new Exception("Configuration Filters is invalid");

            Task<Filter> CreateFilterAsync(FilterSeedModel config)
            {
                return Task.FromResult(new Filter
                {
                    Name = config.Name,
                    Values = config.Values.Select(value => new FilterValue { Value = value }).ToHashSet()
                });
            }

            var rootFilters = await Task.WhenAll(fakeFilters.Select(config => CreateFilterAsync(config)));
            await filtersRepo.AddRangeAsync(rootFilters);
            await filtersRepo.SaveAsync();

            var filters = await filtersRepo.GetListBySpec(new FilterSpecs.GetAll());

            if (!await categoriesRepo.AnyAsync())
            {
                var faker = new Faker();
                var fakeCategories = config.GetSection("Categories").Get<CategorySeedModel[]>()
                    ?? throw new Exception("Configuration Categories is invalid");

                async Task<Category> CreateCategoryAsync(CategorySeedModel config, Category? parentCategory = null)
                {
                    var imageUrl = "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08514660.png"; //faker.Image.LoremFlickrUrl(width: 640, height: 480);
                    Console.WriteLine(imageUrl);
                    byte[] imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
                    var image = await imageService.SaveImageAsync(imageBytes);
        

                    // Знаходимо фільтри для цієї категорії
                    var categoryFilters = config.Filters != null ? filters.Where(f => config.Filters.Any(filterConfig => filterConfig.Name == f.Name)).ToList() : null;

                    var category = new Category
                    {
                        Name = config.Name,
                        Image = image,
                        ParentCategory = parentCategory,
                        Filters = categoryFilters, // Призначаємо фільтри для категорії
                    };
                    
                    if (config.SubCategories != null)
                    {
                        var subcategories = await Task.WhenAll(config.SubCategories.Select(sub => CreateCategoryAsync(sub, category)));
                        category.SubCategories = subcategories.ToHashSet();
                    }

                    return category;
                }

                var rootCategories = await Task.WhenAll(fakeCategories.Select(config => CreateCategoryAsync(config)));
                await categoriesRepo.AddRangeAsync(rootCategories);
                await categoriesRepo.SaveAsync();
            }
        }
    }
}
