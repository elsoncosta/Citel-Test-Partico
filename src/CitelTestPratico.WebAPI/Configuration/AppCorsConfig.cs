using System.Data;

namespace CitelTestPratico.WebAPI.Configuration
{
    public static class AppCorsConfig
    {
        public static void AddDatabaseSetup(this WebApplicationBuilder builder, WebApplication app)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                                      policy =>
                                      {
                                          policy.WithOrigins("http://127.0.0.1.com",
                                                              "http://localhost:4200")
                                                              .AllowAnyHeader()
                                                              .AllowAnyMethod();
                                      });
            });

            app.UseCors(MyAllowSpecificOrigins);
        }
    }
}
