using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence.Models;

namespace Persistence
{
	public class DataContext : DbContext
	{
		public DataContext() { }
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }
		public DbSet<EntryForm> EntryForms { get; set; } = null!;

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			var configuration = new ConfigurationBuilder()
			    .SetBasePath(Directory.GetCurrentDirectory())
			    .AddJsonFile("appsettings.json")
			    .Build();

			var connectionString = configuration.GetConnectionString("DefaultConnection");
			optionsBuilder.UseSqlite(connectionString);
		}
	}
}