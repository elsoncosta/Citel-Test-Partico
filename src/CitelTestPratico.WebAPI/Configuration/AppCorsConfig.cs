using System.Data;

namespace CitelTestPratico.WebAPI.Configuration
{
    public static class AppCorsConfig
    {
        public static void AddCors(this WebApplicationBuilder builder, WebApplication app)
        {
            // builder.Services.AddCors(options =>
            // {
            //     options.AddDefaultPolicy(policy =>
            //                           {
            //                               policy.WithOrigins("http://127.0.0.1:4200","http://localhost:4200",
            //                                                  "http://127.0.0.1:8081","http://localhost:8081")
            //                                                  .AllowAnyHeader()
            //                                                  .AllowAnyMethod();                                                          ;
            //                           });
            // });

            // global cors policy
            if (app.Environment.IsDevelopment())
            {
                app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithMethods()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // allow credentials
            }            
        }
    }
}
