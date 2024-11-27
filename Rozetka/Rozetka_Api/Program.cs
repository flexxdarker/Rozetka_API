using BusinessLogic.Exstensions;
using DataAccess;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connStr = builder.Configuration.GetConnectionString("DefaultConnectionTest")!;

builder.Services.AddCustomServices();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext(connStr);
builder.Services.AddIdentity();
builder.Services.AddRepositories();

builder.Services.AddCustomServices();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();


app.MapControllers();

app.Run();
       