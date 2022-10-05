using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CitelTestPartico.Infra.Data.TypeConfiguration.CategoriaProduto
{
    public class CategoriaProdutoTypeConfiguration : IEntityTypeConfiguration<CitelTestPratico.Dominio.CategoriaProdutoRoot.CategoriaProduto>
    {
        public void Configure(EntityTypeBuilder<CitelTestPratico.Dominio.CategoriaProdutoRoot.CategoriaProduto> builder)
        {
            builder.ToTable("CategoriasProdutos");            
            builder.HasKey(c => c.Id);

            builder.Property(p => p.Id)
                .HasColumnName("Id")
                .HasColumnType("int(11)")
                .IsUnicode()
                .IsRequired();

            builder.HasOne(sc => sc.Produto)
                .WithMany(s => s.Categorias)
                .HasForeignKey(sc => sc.ProdutoId);

            builder.HasOne(sc => sc.Categoria)
                .WithMany(s => s.CanaisVendas)
                .HasForeignKey(sc => sc.CategoriaId);

            builder.Property(p => p.ProdutoId)
                .HasColumnName("ProdutoId")
                .HasColumnType("int(11)");

            builder.Property(p => p.CategoriaId)
                .HasColumnName("CategoriaId")
                .HasColumnType("int(11)");
        }
    }
}
