using AutoMapper;
using CitelTestPartico.Infra.Data.Repository.Interfaces.Categorias;
using CitelTestPratico.Aplicacao.Interfaces.Categorias;
using CitelTestPratico.Aplicacao.Notificacoes.Interfaces;
using CitelTestPratico.Aplicacao.ViewModels.Categorias;
using CitelTestPratico.Dominio;
using CitelTestPratico.WebAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace CitelTestPratico.WebAPI.V1.Controllers.Categorias
{
    [Route("api/v1/categorias")]
    [ApiController]
    public class CategoriaController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ICategoriaRepository _repository;
        private readonly ICategoriaService _service;

        public CategoriaController(INotificador notificador,
            IMapper mapper,
            ICategoriaRepository repository,
            ICategoriaService service) : base(notificador)
        {
            this._mapper = mapper;
            this._repository = repository;
            this._service = service;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CategoriaExibirViewModel), 200)]
        [ProducesResponseType(typeof(BadRequestRetorno), 404)]
        public async Task<IActionResult> GetAsync()
        {
            var model = await _repository.ObterTodos();
            if (model == null)
                return NotFound();
            return CustomResponse(_mapper.Map<List<CategoriaExibirViewModel>>(model));
        }

        [HttpPost]
        [ProducesResponseType(typeof(CategoriaAdicionarViewModel), 201)]
        [ProducesResponseType(typeof(BadRequestRetorno), 404)]
        public async Task<IActionResult> PostAsync([FromBody] CategoriaAdicionarViewModel viewmodel)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            int Id = await _service.Adicionar(viewmodel);

            if (!_notificador.TemNotificacao())
            {
                var modelsretorno = await _repository.ObterPorId(Id);
                var viewModelsRetorno = _mapper.Map<CategoriaExibirViewModel>(modelsretorno);
                return CustomResponse(viewModelsRetorno);
            }

            return CustomResponse();
        }
    }
}