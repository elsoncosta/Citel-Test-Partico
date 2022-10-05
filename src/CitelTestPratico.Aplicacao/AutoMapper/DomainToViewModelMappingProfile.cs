using AutoMapper;
using CitelTestPratico.Aplicacao.ViewModels.Categorias;
using CitelTestPratico.Aplicacao.ViewModels.Produtos;
using CitelTestPratico.Dominio.CategoriaRoot;
using CitelTestPratico.Dominio.ProdutoRoot;

namespace CitelTestPratico.Aplicacao.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<Categoria, CategoriaAdicionarViewModel>().ReverseMap();
            CreateMap<Categoria, CategoriaExibirViewModel>().ReverseMap();
            CreateMap<Categoria, CategoriaAtualizarViewModel>().ReverseMap();

            CreateMap<Produto, ProdutoAdicionarViewModel>()
                .ForMember(r => r.CategoriasIds, a => a.Ignore())
                .ReverseMap();

            CreateMap<Produto, ProdutoExibirViewModel>()
                .ForMember(r=> r.Categorias, a => a.Ignore())
                .ReverseMap();

            CreateMap<Produto, ProdutoAtualizarViewModel>().ReverseMap();
        }
    }
}