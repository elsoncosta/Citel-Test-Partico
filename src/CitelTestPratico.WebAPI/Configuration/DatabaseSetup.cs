using CitelTestPartico.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace CitelTestPratico.WebAPI.Configuration
{   
    public static class DatabaseSetup
    {
        public static void AddDatabaseSetup(this IServiceCollection services, IConfiguration configuration)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            string connectionString = configuration.GetConnectionString("ConnectionString");
            services.AddDbContextPool<ContextBase>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
        }
    }
   
}
