using CitelTestPartico.Infra.Data.Context;
using CitelTestPartico.Infra.Data.Repository.Base;
using CitelTestPartico.Infra.Data.Repository.Interfaces.Categorias;
using CitelTestPratico.Dominio.CategoriaRoot;

namespace CitelTestPartico.Infra.Data.Repository.Categorias
{
    public class CategoriaRepository : Repository<Categoria>, ICategoriaRepository
    {
        public CategoriaRepository(ContextBase context) : base(context)
        {
        }
    }
}
