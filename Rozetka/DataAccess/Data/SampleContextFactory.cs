using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DataAccess.Data
{
    public class SampleContextFactory : IDesignTimeDbContextFactory<RozetkaDbContext>
    {
        public RozetkaDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<RozetkaDbContext>();

            // Завантаження конфігурації
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("appsettings.Development.json", optional: true); // Для середовища розробки

            var config = builder.Build();

            // Отримання рядка підключення
            string? connectionString = config.GetConnectionString("DefaultConnection");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("Connection string 'DefaultConnection' is not defined in configuration.");
            }

            optionsBuilder.UseNpgsql(connectionString);

            // Повернення екземпляру RozetkaDbContext
            return new RozetkaDbContext(optionsBuilder.Options);
        }
    }
}