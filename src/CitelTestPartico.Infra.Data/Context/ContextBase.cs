using CitelTestPartico.Infra.Data.TypeConfiguration.Categoria;
using CitelTestPartico.Infra.Data.TypeConfiguration.CategoriaProduto;
using CitelTestPartico.Infra.Data.TypeConfiguration.Produto;
using CitelTestPratico.Dominio.CategoriaRoot;
using CitelTestPratico.Dominio.ProdutoRoot;
using Microsoft.EntityFrameworkCore;

namespace CitelTestPartico.Infra.Data.Context
{
    public class ContextBase : DbContext
    {
        public ContextBase(DbContextOptions<ContextBase> options) : base(options) 
        {
            Database.Migrate();
        }

        #region DbSets

        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Apply TypeConfigurations

            #region Apply Configuration domínios

            modelBuilder.ApplyConfiguration(new ProdutoTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CategoriaTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CategoriaProdutoTypeConfiguration());
            #endregion

            #endregion

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys())) relationship.DeleteBehavior = DeleteBehavior.ClientSetNull;
            base.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries().Where(entry => entry.Entity.GetType().GetProperty("DataHoraCadastro") != null))
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Property("DataHoraCadastro").CurrentValue = DateTime.Now;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Property("DataHoraCadastro").IsModified = false;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
