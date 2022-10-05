using AutoMapper;
using CitelTestPartico.Infra.Data.Repository.Interfaces.Categorias;
using CitelTestPratico.Aplicacao.Interfaces.Categorias;
using CitelTestPratico.Aplicacao.Notificacoes.Interfaces;
using CitelTestPratico.Aplicacao.ViewModels.Categorias;
using CitelTestPratico.Dominio.CategoriaRoot;

namespace CitelTestPratico.Aplicacao.Services.Categorias
{
    public class CategoriaService : BaseService, ICategoriaService
    {
        private readonly ICategoriaRepository _repository;
        private readonly IMapper mapper;

        public CategoriaService(INotificador notificador,
            ICategoriaRepository repository,
            IMapper mapper) : base(notificador)
        {
            this._repository = repository;
            this.mapper = mapper;
        }

        public async Task<int> Adicionar(CategoriaAdicionarViewModel viewmodel)
        {
            var model = mapper.Map<Categoria>(viewmodel);
            if (model==null)
            {
                Notificar("Canal de venda não pode ser nulo.");
                return 0;
            }

            if (model != null && string.IsNullOrEmpty(model.Descricao))
            {
                Notificar("Descrição do canal de venda, não pode ser nulo.");
                return 0;
            }

            if (model != null && model.Descricao.Length>20)
            {
                Notificar("Descrição do canal de venda, não pode ter mais de 20 caractéries.");
                return 0;
            }

            await _repository.Adicionar(model);
            return model.Id;
        }

        public Task Atualizar(CategoriaAtualizarViewModel entity)
        {
            throw new NotImplementedException();
        }

        public Task Remover(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _repository?.Dispose();
        }
    }
}
