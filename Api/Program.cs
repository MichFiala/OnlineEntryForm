using Application.Services;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Services;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(opt =>
{
	// Use connection.
	opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IEntryFormService, EntryFormService>();
builder.Services.AddScoped<IEntryFormExportService, EntryFormExportService>();
builder.Services.AddCors(opt =>
	opt.AddPolicy("CorsPolicy", policy =>
	{
		policy
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials()
			.WithOrigins("http://localhost:3000");
	})
);

var app = builder.Build();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;
// Migrate database on run
services.GetRequiredService<DataContext>().Database.Migrate();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseRouting();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
	endpoints.MapControllers();
});

app.Run();
