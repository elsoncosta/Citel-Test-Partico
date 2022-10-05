using CitelTestPratico.Aplicacao.ViewModels.Categorias;
using CitelTestPratico.Dominio.CategoriaRoot;

namespace CitelTestPratico.Aplicacao.Interfaces.Categorias
{
    public interface ICategoriaService : IDisposable
    {
        Task<int> Adicionar(CategoriaAdicionarViewModel model);
        Task Atualizar(CategoriaAtualizarViewModel model);
        Task Remover(int id);
    }
}
