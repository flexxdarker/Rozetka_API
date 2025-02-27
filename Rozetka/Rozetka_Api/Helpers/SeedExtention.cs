using BusinessLogic.Enities;
using Microsoft.AspNetCore.Identity;
using System.Reflection;

using BusinessLogic.Interfaces;
using DataAccess.Repostories;
using Rozetka_Api.Models.CategoryConfigModels;
using Rozetka_Api.Models.StatusModel;
using Bogus;
using static Rozetka_Api.Models.CategoryConfigModels.CategorySeedModel;
using Bogus.DataSets;
using BusinessLogic.Specifications;
using System.Linq;
using BusinessLogic.Entities;
using System.Text;
using System.Text.Json;
using Newtonsoft.Json;
using JsonException = Newtonsoft.Json.JsonException;
using System.Globalization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using DataAccess.Repositories;

namespace Rozetka_Api.Helpers
{
    public static class Roles
    {
        public const string ADMIN = "admin";
        public const string USER = "user";
    }

    public static class Seeder
    {
        public static async Task SeedRoles(this IServiceProvider app)
        {
            var roleManager = app.GetRequiredService<RoleManager<IdentityRole>>();

            var roles = typeof(Roles).GetFields(
                BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                .Select(x => (string)x.GetValue(null)!);

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }

        public static async Task SeedStatuses(this WebApplication app, IConfiguration config)
        {
            using var scope = app.Services.CreateScope();
            var orderStatusRepo = scope.ServiceProvider.GetService<DataAccess.Repositories.IRepository<OrderStatus>>()
               ?? throw new NullReferenceException("IRepository<OrderStatus>");

            if (!await orderStatusRepo.AnyAsync())
            {
                string statusesJsonDataFile = Path.Combine(Environment.CurrentDirectory, config.GetSection("SeederJsonDataDir").Value!, "StatusItem.json");
                if (Path.Exists(statusesJsonDataFile))
                {
                    var statusesJson = File.ReadAllText(statusesJsonDataFile, Encoding.UTF8);
                    if (!statusesJson.IsNullOrEmpty())
                    {
                        var statusesModels = JsonConvert.DeserializeObject<IEnumerable<StatusSeedModel>>(statusesJson)
                                        ?? throw new JsonException("DeserializeObject<IEnumerable<StatusSeedModel>>");

                        if (statusesModels.Any())
                        {
                            Console.ForegroundColor = ConsoleColor.Green;
                            Console.WriteLine("\nSeed Order statuses\n");
                            Console.ForegroundColor = ConsoleColor.White;
                            var statuses = statusesModels.Select(x => new OrderStatus()
                            {
                                Status = x.Status,
                            });
                            await orderStatusRepo.AddRangeAsync(statuses);
                            await orderStatusRepo.SaveAsync();
                        }
                    }
                    else Console.WriteLine($"File \"{Path.Combine(config.GetSection("SeederJsonDataDir").Value!, "Statuses.json")}\" null or empty");
                }
                else Console.WriteLine($"File \"{Path.Combine(config.GetSection("SeederJsonDataDir").Value!, "Statuses.json")}\" not found");
            }
        }

        public static async Task SeedAdmin(this IServiceProvider app)
        {
            var userManager = app.GetRequiredService<UserManager<User>>();
            var imageService = app.GetRequiredService<IImageService>();

            const string USERNAME = "admin@gmail.com";
            const string PASSWORD = "Admin1@";
            const string IMAGE = "1200_image.webp";
                
            var existingUser = await userManager.FindByEmailAsync(USERNAME);
            
            var image = await imageService.SaveImageAsync(IMAGE);
            if (existingUser == null)
            {
                var user = new User
                {
                    Name = "Семен",
                    SurName = "Малько",
                    Birthdate = DateTime.UtcNow,
                    PhoneNumber = "+380123456789",
                    UserName = USERNAME,
                    Email = USERNAME
                };

                user.Image.Name = image;

                var result = await userManager.CreateAsync(user, PASSWORD);

                if (result.Succeeded)
                    await userManager.AddToRoleAsync(user, Roles.ADMIN);
            }
        }

        public static async Task SeedCategoriesAndFilters(this WebApplication app, IConfiguration config)
        {
            using var scope = app.Services.CreateScope();
            var imageService = scope.ServiceProvider.GetService<IImageService>()
                ?? throw new NullReferenceException("IImageService");
            var filterService = scope.ServiceProvider.GetService<IFilterService>()
                ?? throw new NullReferenceException("IFilterService");
            var categoriesRepo = scope.ServiceProvider.GetService<IRepository<Category>>()
                ?? throw new NullReferenceException("IRepository<Category>");
            var filtersRepo = scope.ServiceProvider.GetService<IRepository<Filter>>()
                ?? throw new NullReferenceException("IRepository<Filter>");
            var categoryFiltersRepo = scope.ServiceProvider.GetService<IRepository<CategoryFilter>>()
                ?? throw new NullReferenceException("IRepository<CategoryFilter>");
            using var httpClient = new HttpClient();

            if (!await filtersRepo.AnyAsync())
            {
                string filtersJsonDataFile = Path.Combine(Environment.CurrentDirectory, config.GetSection("SeederJsonDataDir").Value!, "Filters.json");
                if (Path.Exists(filtersJsonDataFile))
                { 
                    var filtersJson = File.ReadAllText(filtersJsonDataFile, Encoding.UTF8);
                    if (!filtersJson.IsNullOrEmpty())
                    {
                        var filtersModels = JsonConvert.DeserializeObject<IEnumerable<FilterSeedModel>>(filtersJson)
                                        ?? throw new JsonException("DeserializeObject<IEnumerable<FilterSeedModel>>");

                        if (filtersModels.Any())
                        {
                            Console.ForegroundColor = ConsoleColor.Green;
                            Console.WriteLine("\nSeed Filters\n");
                            Console.ForegroundColor = ConsoleColor.White;
                            var filters = filtersModels.Select(x => new Filter()
                            {
                                Name = x.Name,
                                Values = x.Values.Select(z => new FilterValue() { Value = z }).ToList()
                            });
                            await filtersRepo.AddRangeAsync(filters);
                            await filtersRepo.SaveAsync();
                        }
                    }
                    else Console.WriteLine($"File \"{Path.Combine(config.GetSection("SeederJsonDataDir").Value!, "Categories.json")}\" null or empty");
                }
                else Console.WriteLine($"File \"{Path.Combine(config.GetSection("SeederJsonDataDir").Value!, "Filters.json")}\" not found");
            }

            var allFilters = await filtersRepo.GetListBySpec(new FilterSpecs.GetAll())
                ?? throw new Exception("Filters are not seeded correctly or empty.");

            if (!await categoriesRepo.AnyAsync())
            {
                var faker = new Faker();
                
                string categoriessJsonDataFile = Path.Combine(Environment.CurrentDirectory, config.GetSection("SeederJsonDataDir").Value!, "Categories.json");
                if (Path.Exists(categoriessJsonDataFile))
                {
                    var categoriesJson = File.ReadAllText(categoriessJsonDataFile, Encoding.UTF8);
                    if (!categoriesJson.IsNullOrEmpty()) 
                    {
                        var categoriesModels = JsonConvert.DeserializeObject<IEnumerable<CategorySeedModel>>(categoriesJson)
                                        ?? throw new JsonException("DeserializeObject<IEnumerable<CategorySeedModel>>");

                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("\nSeed Categories\n");
                        Console.ForegroundColor = ConsoleColor.White;
                        async Task<Category> CreateCategoryAsync(CategorySeedModel config, Category? parentCategory = null)
                        {
                            var imageUrl = "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08514660.png"; //faker.Image.LoremFlickrUrl(width: 640, height: 480);
                            byte[] imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
                            var image = await imageService.SaveImageAsync(imageBytes);

                            var category = new Category
                            {
                                Name = config.Name,
                                Image = image,
                                ParentCategory = parentCategory,
                            };

                            if (config.SubCategories != null)
                            {
                                var subcategories = await Task.WhenAll(config.SubCategories.Select(sub => CreateCategoryAsync(sub, category)));
                                category.SubCategories = subcategories.ToHashSet();
                            }

                            return category;
                        }

                        var rootCategories = await Task.WhenAll(categoriesModels.Select(config => CreateCategoryAsync(config)));
                        await categoriesRepo.AddRangeAsync(rootCategories);
                        await categoriesRepo.SaveAsync();

                        var allCategories = await categoriesRepo.GetListBySpec(new CategorySpecs.GetAll());
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("\nSeed CategoryFilters\n");
                        Console.ForegroundColor = ConsoleColor.White;
                        async Task CreateCategoryFiltersAsync(CategorySeedModel config, List<CategoryFilter> categoryFiltersList)
                        {
                            var categoryFilters = allFilters
                                .Where(filter => config.Filters != null && config.Filters.Any(filterName => filterName == filter.Name))
                                .Select(filter => new CategoryFilter { Filter = filter, FilterId = filter.Id })
                                .ToList();

                            var category = allCategories.Where(x => x.Name.ToLower() == config.Name.ToLower()).Select(x => x).FirstOrDefault();
                            foreach (var filter in categoryFilters)
                            {
                                categoryFiltersList.Add(new CategoryFilter
                                {
                                    Filter = filter.Filter,
                                    FilterId = filter.FilterId,
                                    Category = category,
                                    CategoryId = category!.Id + 1
                                });
                            }

                            if (config.SubCategories != null)
                            {
                                foreach (var subCategory in config.SubCategories)
                                {
                                    await CreateCategoryFiltersAsync(subCategory, categoryFiltersList);
                                }
                            }

                        }
                        List<CategoryFilter> categoryFiltersList = new List<CategoryFilter>();
                        foreach (var categorySeedModel in categoriesModels)
                        {
                            await CreateCategoryFiltersAsync(categorySeedModel, categoryFiltersList);
                        }
                        await categoryFiltersRepo.AddRangeAsync(categoryFiltersList);
                        await categoryFiltersRepo.SaveAsync();
                    }
                    else Console.WriteLine($"File \"{Path.Combine(config.GetSection("SeederJsonDataDir").Value!, "Categories.json")}\" null or empty");
                }
                else Console.WriteLine($"File \"{Path.Combine(config.GetSection("SeederJsonDataDir").Value!, "Categories.json")}\" not found");
            }
        }
    }
}
