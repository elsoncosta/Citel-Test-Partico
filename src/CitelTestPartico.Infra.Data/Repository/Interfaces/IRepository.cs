using CitelTestPratico.Dominio.Core.Models;
using System.Linq.Expressions;

namespace CitelTestPartico.Infra.Data.Repository.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : Entity
    {
        Task Adicionar(TEntity entity);
        Task Adicionar(List<TEntity> entity);
        Task<TEntity> ObterPorId(int id);
        Task<List<TEntity>> ObterTodos();
        Task Atualizar(TEntity entity);
        Task Atualizar(List<TEntity> entity);
        Task Remover(int id);

        Task<IEnumerable<TEntity>> Buscar(Expression<Func<TEntity, bool>> predicate);
        Task<int> SaveChanges();
        bool UpdateValeuWithViewModel(object model, object viewmodel);
    }
}
