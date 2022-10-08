using CitelTestPratico.Aplicacao.ViewModels.Base;
using CitelTestPratico.Aplicacao.ViewModels.Categorias;

namespace CitelTestPratico.Aplicacao.ViewModels.Produtos
{
    public class ProdutoAtualizarViewModel : BaseViewModel
    {
        public string Nome { get; set; }
        public string CodigoBarra { get; set; }
        public string Descricao { get; set; }
        public bool Ativo { get; set; }
        public string UriImageDefault { get; set; }
        public List<int> CategoriasIds { get; set; }
    }
}
