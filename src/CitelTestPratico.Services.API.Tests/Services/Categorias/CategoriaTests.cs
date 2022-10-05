using AutoMapper;
using CitelTestPartico.Infra.Data.Repository.Interfaces.Categorias;
using CitelTestPratico.Aplicacao.AutoMapper;
using CitelTestPratico.Aplicacao.Notificacoes;
using CitelTestPratico.Aplicacao.Notificacoes.Interfaces;
using CitelTestPratico.Aplicacao.Services.Categorias;
using Moq;
using Xunit;

namespace CitelTestPratico.Services.API.Tests.Services.Categorias
{

    public class CategoriaTests
    {
        private CategoriaService _service;
        private INotificador _notificador;


        public CategoriaTests()
        {
            var config = AutoMapperConfiguration.RegisterMappings();
            var _imapper = new Mock<IMapper>().Object;
            _notificador = new Notificador();
            _service = new CategoriaService(_notificador, new Mock<ICategoriaRepository>().Object, config.CreateMapper());
        }

        [Fact]
        public async void Adiciona_validaNull()
        {
            int id = await   _service.Adicionar(new Aplicacao.ViewModels.Categorias.CategoriaAdicionarViewModel());

            bool retorno = !_notificador.TemNotificacao();

            foreach (var item in _notificador.ObterNotificacoes())
            {
                Assert.False(retorno, item.Mensagem);
            }
        }

        [Fact]
        public async void Adiciona_validaDescricao()
        {
            var viewModel = new Aplicacao.ViewModels.Categorias.CategoriaAdicionarViewModel() { Descricao = "E-Commerce" };
            int id = await _service.Adicionar(viewModel);

            bool retorno = !_notificador.TemNotificacao();

            foreach (var item in _notificador.ObterNotificacoes())
            {
                Assert.True(retorno, item.Mensagem);
            }
        }

        [Fact]
        public async void Adiciona_validaDescricaoMaximo20Caracteries()
        {
            var viewModel = new Aplicacao.ViewModels.Categorias.CategoriaAdicionarViewModel() { Descricao = "Descrição com mais de vinte caractéries" };
            int id = await _service.Adicionar(viewModel);

            bool retorno = !_notificador.TemNotificacao();

            foreach (var item in _notificador.ObterNotificacoes())
            {
                Assert.False(retorno, item.Mensagem);
            }
        }
    }
}
