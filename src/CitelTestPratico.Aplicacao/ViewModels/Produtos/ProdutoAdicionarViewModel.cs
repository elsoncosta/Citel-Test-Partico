using CitelTestPratico.Aplicacao.ViewModels.Base;

namespace CitelTestPratico.Aplicacao.ViewModels.Produtos
{
    public class ProdutoAdicionarViewModel 
    {
        public string Nome { get; set; }
        public string CodigoBarra { get; set; }
        public string Descricao { get; set; }
        public string UriImageDefault { get; set; }
        public List<int> CategoriasIds { get; set; }
    }
}
