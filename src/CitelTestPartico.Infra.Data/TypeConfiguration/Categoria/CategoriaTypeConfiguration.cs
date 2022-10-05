using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CitelTestPartico.Infra.Data.TypeConfiguration.Categoria
{
    public class CategoriaTypeConfiguration : IEntityTypeConfiguration<CitelTestPratico.Dominio.CategoriaRoot.Categoria>
    {
        public void Configure(EntityTypeBuilder<CitelTestPratico.Dominio.CategoriaRoot.Categoria> builder)
        {
            builder.ToTable("Categorias");
            builder.HasKey(c => c.Id);

            builder.Property(p => p.Id)
                .HasColumnName("Id")
                .HasColumnType("int(11)")
                .IsUnicode()
                .IsRequired();

            builder.Property(p => p.Descricao)
                .HasColumnName("Descricao")
                .HasColumnType("varchar(36)")
                .HasMaxLength(20)
                .IsRequired();
        }
    }
}
