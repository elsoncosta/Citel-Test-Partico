using CitelTestPratico.Aplicacao.ViewModels.Produtos;

namespace CitelTestPratico.Aplicacao.Interfaces.Produtos
{
    public interface IProdutoService : IDisposable
    {
        Task<int> Adicionar(ProdutoAdicionarViewModel entity);
        Task Atualizar(ProdutoAtualizarViewModel entity);
        Task Remover(Guid id);
    }
}
