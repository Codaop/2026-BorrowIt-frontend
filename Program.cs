using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container (Ganti ConfigureServices)
builder.Services.AddControllersWithViews();

var app = builder.Build();

// 2. Configure the HTTP request pipeline (Ganti Configure)
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

// Menangani routing SPA (React)
app.MapFallbackToFile("index.html");

app.Run();