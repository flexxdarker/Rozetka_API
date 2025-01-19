using BusinessLogic.Entities;
using DataAccess.Data;
using DataAccess.Repostories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess
{
    public static class ServiceExtentions
    {
        public static void AddDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<RozetkaDbContext>(opts => opts.UseNpgsql(connectionString));
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        }

        public static void AddIdentity(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
            })
               .AddDefaultTokenProviders()
               .AddEntityFrameworkStores<RozetkaDbContext>();
        }

        public static void DataBaseMigrate(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var serviceProvider = scope.ServiceProvider;
            var context = serviceProvider.GetRequiredService<RozetkaDbContext>();
            try
            {
                context.Database.Migrate();
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message + ex.Source);
            }
        }

        public static void AddUploadingsFolder(this WebApplication app, string CurrentDirectoryPath)
        {
            string imagesDirPath = Path.Combine(CurrentDirectoryPath, app.Configuration["DirImages"]!);

            if (!Directory.Exists(imagesDirPath))
            {
                Directory.CreateDirectory(imagesDirPath);
            }
        }
    }
}