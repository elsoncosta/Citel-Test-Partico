using Microsoft.EntityFrameworkCore;

namespace CitelTestPartico.Infra.Data.TypeConfiguration.Produto
{
    public class ProdutoTypeConfiguration : IEntityTypeConfiguration<CitelTestPratico.Dominio.ProdutoRoot.Produto>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<CitelTestPratico.Dominio.ProdutoRoot.Produto> builder)
        {
            builder.ToTable("Produtos");
            builder.HasKey(c => c.Id);

            builder.Property(p => p.Id)
                .HasColumnName("Id")
                .HasColumnType("int(11)")
                .IsUnicode()
                .IsRequired();

            builder.Property(p => p.Nome)
            .HasColumnName("Nome")
            .HasColumnType("char(150)");

            builder.Property(p => p.UriImageDefault)
           .HasColumnName("UriImageDefault")
           .HasMaxLength(1000)
           .HasColumnType("varchar(1000)");

            builder.Property(p => p.CodigoBarra)
           .HasColumnName("CodigoBarra")
           .HasMaxLength(100)
           .HasColumnType("char(100)");

            builder.Property(p => p.Ativo)
             .HasColumnName("Ativo")
             .HasColumnType("tinyint(1)");


            builder.Property(p => p.Descricao)
                .HasColumnName("Descricao")
                .HasColumnType("varchar(250)")
                .HasMaxLength(250)
                .IsRequired();
        }
    }
}
