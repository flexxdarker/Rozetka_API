using BusinessLogic.Exstensions;
using DataAccess;
using Rozetka_Api.Helpers;

namespace Rozetka_Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var connStr = builder.Configuration.GetConnectionString("TestConnection")!;

            builder.Services.AddCustomServices();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext(connStr);
            builder.Services.AddIdentity();
            builder.Services.AddRepositories();

            builder.Services.AddCustomServices();

            var app = builder.Build();

            app.DataBaseMigrate();
            app.AddUploadingsFolder(Directory.GetCurrentDirectory());

            using (var scope = app.Services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                serviceProvider.SeedCategories(builder.Configuration).Wait();
            }

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
       