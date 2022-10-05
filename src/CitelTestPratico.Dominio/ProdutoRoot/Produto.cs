using CitelTestPratico.Dominio.CategoriaProdutoRoot;
using CitelTestPratico.Dominio.Core.Models;

namespace CitelTestPratico.Dominio.ProdutoRoot
{
    public class Produto : Entity
    {
        public string Nome { get; set; }
        public string CodigoBarra { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
        public string UriImageDefault { get; set; }
        public List<CategoriaProduto> Categorias { get; set; }
    }
}
