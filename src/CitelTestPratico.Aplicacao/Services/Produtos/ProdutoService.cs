using AutoMapper;
using CitelTestPartico.Infra.Data.Repository.Interfaces.Produtos;
using CitelTestPratico.Aplicacao.Interfaces.Produtos;
using CitelTestPratico.Aplicacao.Notificacoes.Interfaces;
using CitelTestPratico.Aplicacao.ViewModels.Produtos;
using CitelTestPratico.Dominio.ProdutoRoot;

namespace CitelTestPratico.Aplicacao.Services.Produtos
{
    public class ProdutoService : BaseService, IProdutoService
    {
        private readonly IProdutoRepository _repository;
        private readonly IMapper mapper;

        public ProdutoService(INotificador notificador,
            IProdutoRepository repository,
            IMapper mapper) : base(notificador)
        {
            this._repository = repository;
            this.mapper = mapper;
        }

        public async Task<int> Adicionar(ProdutoAdicionarViewModel viewmodel)
        {
            var model = mapper.Map<Produto>(viewmodel);
            if (viewmodel == null)
            {
                Notificar("Produto não pode ser nulo.");
                return 0;
            }

            if (viewmodel != null && string.IsNullOrEmpty(viewmodel.Descricao))
            {
                Notificar("Descrição do produto, não pode ser nulo");
                return 0;
            }

            if (viewmodel != null && viewmodel.Descricao.Length>50)
            {
                Notificar("Descrição do produto, não pode maior que 50 caractéries.");
                return 0;
            }

            if (viewmodel != null && viewmodel.CategoriasIds == null || viewmodel.CategoriasIds.Count==0)
            {
                Notificar("Adicione ao menos 1 ou mais canais de vendas.");
                return 0;
            }

            model.Categorias = new List<Dominio.CategoriaProdutoRoot.CategoriaProduto>();

            foreach (var item in viewmodel.CategoriasIds)
            {
                model.Categorias.Add(new Dominio.CategoriaProdutoRoot.CategoriaProduto() { CategoriaId = item, Produto = model });
            }

            await _repository.Adicionar(model);
            return model.Id;
        }

        public async Task<int> Atualizar(ProdutoAtualizarViewModel viewmodel)
        {
            var model = mapper.Map<Produto>(viewmodel);
            if (viewmodel == null)
            {
                Notificar("Produto não pode ser nulo.");
                return 0;
            }

            if (viewmodel != null && string.IsNullOrEmpty(viewmodel.Descricao))
            {
                Notificar("Descrição do produto, não pode ser nulo");
                return 0;
            }

            if (viewmodel != null && viewmodel.Descricao.Length>50)
            {
                Notificar("Descrição do produto, não pode maior que 50 caractéries.");
                return 0;
            }

            if (viewmodel != null && viewmodel.CategoriasIds == null || viewmodel.CategoriasIds.Count==0)
            {
                Notificar("Adicione ao menos 1 ou mais canais de vendas.");
                return 0;
            }

            model.Categorias = new List<Dominio.CategoriaProdutoRoot.CategoriaProduto>();

            foreach (var item in viewmodel.CategoriasIds)
            {
                model.Categorias.Add(new Dominio.CategoriaProdutoRoot.CategoriaProduto() { CategoriaId = item, Produto = model });
            }

            await _repository.Atualizar(model);
            return model.Id;
        }

        public void Dispose()
        {
            _repository?.Dispose();
        }

        public Task Remover(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
