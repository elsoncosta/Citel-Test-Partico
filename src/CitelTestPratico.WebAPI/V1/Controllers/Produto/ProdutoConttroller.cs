using AutoMapper;
using CitelTestPartico.Infra.Data.Repository.Interfaces.Produtos;
using CitelTestPratico.Aplicacao.Interfaces.Produtos;
using CitelTestPratico.Aplicacao.Notificacoes.Interfaces;
using CitelTestPratico.Aplicacao.ViewModels.Produtos;
using CitelTestPratico.Dominio;
using CitelTestPratico.WebAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace CitelTestPratico.WebAPI.V1.Controllers.Produto
{

    [Route("api/v1/produtos")]
    [ApiController]
    public class ProdutoConttroller : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IProdutoRepository _repository;
        private readonly IProdutoService _service;

        public ProdutoConttroller(INotificador notificador,
            IMapper mapper,
            IProdutoRepository repository,
            IProdutoService service) : base(notificador)
        {
            this._mapper = mapper;
            this._repository = repository;
            this._service = service;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ProdutoExibirViewModel), 200)]
        [ProducesResponseType(typeof(BadRequestRetorno), 404)]
        public async Task<IActionResult> GetAsync()
        {
            var modelsretorno = await _repository.ObterTodos();
            if (modelsretorno == null)
                return NotFound();

            var viewModelsRetorno = _mapper.Map<List<ProdutoExibirViewModel>>(modelsretorno);

            foreach (var produto in modelsretorno)
            {
                foreach (var Categoria in produto.Categorias)
                {
                    var produtoView = viewModelsRetorno.Where(r => r.Id.Equals(produto.Id)).SingleOrDefault();
                    if (produtoView != null)
                        produtoView.Categorias.Add(new Aplicacao.ViewModels.Categorias.CategoriaExibirViewModel() { Descricao = Categoria.Categoria.Descricao, Id = Categoria.Categoria.Id });
                }
            }

            return CustomResponse(viewModelsRetorno);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ProdutoAdicionarViewModel), 201)]
        [ProducesResponseType(typeof(BadRequestRetorno), 404)]
        public async Task<IActionResult> PostAsync([FromBody] ProdutoAdicionarViewModel viewmodel)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            int Id = await _service.Adicionar(viewmodel);

            if (!_notificador.TemNotificacao())
            {
                var modelsretorno = await _repository.ObterPorId(Id);
                var viewModelsRetorno = _mapper.Map<ProdutoExibirViewModel>(modelsretorno);
                foreach (var item in modelsretorno.Categorias)
                {
                    viewModelsRetorno.Categorias.Add(new Aplicacao.ViewModels.Categorias.CategoriaExibirViewModel() { Descricao = item.Categoria.Descricao, Id = item.Categoria.Id });
                }
                return CustomResponse(viewModelsRetorno);
            }

            return CustomResponse();
        }

        [HttpGet("{Id:int}")]
        [ProducesResponseType(typeof(ProdutoExibirViewModel), 201)]
        [ProducesResponseType(typeof(BadRequestRetorno), 404)]
        public async Task<IActionResult> GetAsync(int Id)
        {
            var modelsretorno = await _repository.ObterPorId(Id);
            if(modelsretorno!=null)
            {
                var viewModelsRetorno = _mapper.Map<ProdutoExibirViewModel>(modelsretorno);

                foreach (var item in modelsretorno.Categorias)
                {
                    viewModelsRetorno.Categorias.Add(new Aplicacao.ViewModels.Categorias.CategoriaExibirViewModel() { Descricao = item.Categoria.Descricao, Id = item.Categoria.Id });
                }

                return CustomResponse(viewModelsRetorno);
            }
            return CustomResponse();
        }

        [HttpGet("pesquisa")]
        [ProducesResponseType(typeof(ProdutoExibirViewModel), 201)]
        [ProducesResponseType(typeof(BadRequestRetorno), 404)]
        public async Task<IActionResult> BuscaAsync([FromQuery] string descricao)
        {
            var modelsretorno = await _repository.Buscar(descricao);
            if (modelsretorno != null)
            {
                var viewModelsRetorno = _mapper.Map<List<ProdutoExibirViewModel>>(modelsretorno);

                foreach (var produto in modelsretorno)
                {
                    foreach (var Categoria in produto.Categorias)
                    {
                        var produtoView = viewModelsRetorno.Where(r => r.Id.Equals(produto.Id)).SingleOrDefault();
                        if(produtoView!=null)
                            produtoView.Categorias.Add(new Aplicacao.ViewModels.Categorias.CategoriaExibirViewModel() { Descricao = Categoria.Categoria.Descricao, Id = Categoria.Categoria.Id });
                    }
                }

                return CustomResponse(viewModelsRetorno);
            }
            return CustomResponse();
        }
    }
}
