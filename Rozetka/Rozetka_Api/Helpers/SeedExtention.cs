using BusinessLogic.Entities.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using DataAccess.Repostories;
using Rozetka_Api.Models.CategoryConfigModels;
using Bogus;

namespace Rozetka_Api.Helpers
{
    public static class Seeder
    {
        public static async Task SeedCategories(this IServiceProvider app, IConfiguration config)
        {
            using var scope = app.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var imageService = scope.ServiceProvider.GetService<IImageService>()
                ?? throw new NullReferenceException("IImageService");
            var categories = scope.ServiceProvider.GetService<IRepository<Category>>()
                ?? throw new NullReferenceException("IRepository<Category>");
            using var httpClient = new HttpClient();

            if (!await categories.AnyAsync())
            {
                var faker = new Faker();
                var fakeCategories = config.GetSection("Categories").Get<CategoryConfig[]>()
                    ?? throw new Exception("Configuration Categories is invalid");

                async Task<Category> CreateCategoryAsync(CategoryConfig config, Category? parentCategory = null)
                {
                    var imageUrl = faker.Image.LoremFlickrUrl(keywords: "electronics,technology", width: 1000, height: 800);
                    var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
                    var image = await imageService.SaveImageAsync(imageBytes);

                    var category = new Category
                    {
                        Name = config.Name,
                        Image = image,
                        ParentCategory = parentCategory,
                        Filters = parentCategory != null ? config.Filters?.Select(filter => new CategoryFilter
                        {
                            Filter = new Filter
                            {
                                Name = filter.Name,
                                Values = filter.Values.Select(value => new FilterValue { Value = value }).ToHashSet()
                            }
                        }).ToHashSet() : null
                    };

                    if (config.SubCategories != null)
                    {
                        var subcategories = await Task.WhenAll(config.SubCategories.Select(sub => CreateCategoryAsync(sub, category)));
                        category.SubCategories = subcategories.ToHashSet();
                    }

                    return category;
                }

                var rootCategories = await Task.WhenAll(fakeCategories.Select(config => CreateCategoryAsync(config)));
                await categories.AddRangeAsync(rootCategories);
                await categories.SaveAsync();
            }
        }
    }
}
