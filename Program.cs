using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using ProductReviewApi;
using ProductReviewApi.Data;
using ProductReviewApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register ApplicationDbContext with DI
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register ProductService with DI
builder.Services.AddScoped<IProductService, ProductService>();

// Register ReviewService with DI
builder.Services.AddScoped<ReviewService>();

// Add CORS policy to allow requests from the React app (running on localhost:3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000") // React app URL
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add other services like Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply CORS middleware
app.UseCors("AllowReactApp");

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Map controllers to endpoints
app.MapControllers();

app.Run();
