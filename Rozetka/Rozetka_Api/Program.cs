using BusinessLogic.Exstensions;
using DataAccess;

namespace Rozetka_Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var connStr = builder.Configuration.GetConnectionString("DefaultConnection")!;

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

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
       