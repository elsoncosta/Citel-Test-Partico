using CitelTestPratico.Dominio.CategoriaRoot;
using CitelTestPratico.Dominio.Core.Models;
using CitelTestPratico.Dominio.ProdutoRoot;

namespace CitelTestPratico.Dominio.CategoriaProdutoRoot
{
    public class CategoriaProduto : Entity
    {
        public int CategoriaId { get; set; }
        public Categoria  Categoria { get; set; }

        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }
    }
}
