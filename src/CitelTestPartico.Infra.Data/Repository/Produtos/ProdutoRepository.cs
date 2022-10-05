using CitelTestPartico.Infra.Data.Context;
using CitelTestPartico.Infra.Data.Repository.Base;
using CitelTestPartico.Infra.Data.Repository.Interfaces.Produtos;
using CitelTestPratico.Dominio.ProdutoRoot;
using Microsoft.EntityFrameworkCore;

namespace CitelTestPartico.Infra.Data.Repository.Produtos
{
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(ContextBase context) : base(context)
        {
        }

        public override async Task<List<Produto>> ObterTodos()
        {
            var model = await this.Db.Produtos.AsNoTracking()
                .Include(r => r.Categorias).ThenInclude(r => r.Categoria)
                .ToListAsync();
            return model;
        }

        public async Task<List<Produto>> Buscar(string descricao)
        {
            var model = await this.Db.Produtos.AsNoTracking()
                .Include(r => r.Categorias).ThenInclude(r => r.Categoria)
                .Where(d => d.Descricao.Contains(descricao)).ToListAsync();
            return model;
        }

        public override async Task<Produto> ObterPorId(int id)
        {
            var model = await this.Db.Produtos.AsNoTracking()
                .Include(r=> r.Categorias).ThenInclude(r=> r.Categoria)
                .Where(d => d.Id.Equals(id)).FirstOrDefaultAsync();
            return model;
        }

    }
}
