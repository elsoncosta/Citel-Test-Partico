using CitelTestPratico.Dominio.CategoriaProdutoRoot;
using CitelTestPratico.Dominio.Core.Models;

namespace CitelTestPratico.Dominio.CategoriaRoot
{
    public class Categoria : Entity
    {
        public string Descricao { get; set; }
        public List<CategoriaProduto> CanaisVendas { get; set; }
    }
}
