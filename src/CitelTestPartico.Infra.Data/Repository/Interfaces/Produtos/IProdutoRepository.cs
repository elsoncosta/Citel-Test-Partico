using CitelTestPratico.Dominio.ProdutoRoot;

namespace CitelTestPartico.Infra.Data.Repository.Interfaces.Produtos
{
    public interface IProdutoRepository : IRepository<Produto>
    {
        Task<List<Produto>> Buscar(string descricao);
    }
}
