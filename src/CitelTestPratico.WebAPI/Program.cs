using CitelTestPratico.WebAPI.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDatabaseSetup(builder.Configuration);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Swagger Config
builder.Services.AddSwaggerSetup();

// AutoMapper Settings
builder.Services.AddAutoMapperSetup();

//builder.Services.AddApiVersioning();

builder.Services.AddDependencyInjectionSetup();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

builder.AddCors(app);

app.UseAuthorization();

app.MapControllers();

app.Run();
