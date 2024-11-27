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

            ConfigurationBuilder builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            //builder.AddJsonFile("appsettings.Development.json");
            builder.AddJsonFile("appsettings.json");
            IConfigurationRoot config = builder.Build();

            string? connectionString = config.GetConnectionString("TestConnection");
            optionsBuilder.UseNpgsql(connectionString);
            return new RozetkaDbContext(optionsBuilder.Options);
        }
    }
}