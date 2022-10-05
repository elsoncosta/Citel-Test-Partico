using CitelTestPartico.Infra.Data.Context;
using CitelTestPartico.Infra.Data.Repository.Categorias;
using CitelTestPartico.Infra.Data.Repository.Interfaces.Categorias;
using CitelTestPartico.Infra.Data.Repository.Interfaces.Produtos;
using CitelTestPartico.Infra.Data.Repository.Produtos;
using CitelTestPratico.Aplicacao.Interfaces.Categorias;
using CitelTestPratico.Aplicacao.Interfaces.Produtos;
using CitelTestPratico.Aplicacao.Interfaces.Users;
using CitelTestPratico.Aplicacao.Notificacoes;
using CitelTestPratico.Aplicacao.Notificacoes.Interfaces;
using CitelTestPratico.Aplicacao.Services.Categorias;
using CitelTestPratico.Aplicacao.Services.Produtos;
using CitelTestPratico.Infra.CrossCutting.Identity.Authorization;
using CitelTestPratico.Infra.CrossCutting.Identity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace CitelTestPratico.Infra.CrossCutting.IoC
{
    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services)
        {
            // ASP.NET Authorization Polices -
            services.AddSingleton<IAuthorizationHandler, ClaimsRequirementHandler>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<INotificador, Notificador>();

            #region Contextos
            services.AddScoped<ContextBase>();
            //services.AddScoped<ContextBaseIdentity>();
            #endregion

            services.AddScoped<IAspNetUser, AspNetUser>();

            #region Repositórios


            services.AddScoped<IProdutoRepository, ProdutoRepository>();
            services.AddScoped<IProdutoService, ProdutoService>();

            services.AddScoped<ICategoriaRepository, CategoriaRepository>();
            services.AddScoped<ICategoriaService, CategoriaService>();


            #endregion
        }
    }
}