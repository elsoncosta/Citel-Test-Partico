using FluentValidation;
using CitelTestPratico.Dominio.ProdutoRoot;

namespace CitelTestPratico.Aplicacao.Validation.Produtos
{
    public class ProdutoValidation : AbstractValidator<Produto>
    {
        public ProdutoValidation()
        {
            RuleFor(p => p.Descricao)
                .NotEmpty().WithMessage("O campo {PropertyName} é obrigatório.")
                .Length(3, 250).WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres.");

            RuleFor(p => p.Nome)
                .NotEmpty().WithMessage("O campo {PropertyName} é obrigatório.")
                .Length(3, 150).WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres.");

            RuleFor(p => p.CodigoBarra)
                .NotEmpty().WithMessage("O campo {PropertyName} é obrigatório.")
                .Length(3, 100).WithMessage("O campo {PropertyName} precisa ter entre {MinLength} e {MaxLength} caracteres.");

            //RuleFor(p => p.Categorias)
            //    .NotNull().WithMessage("O campo {PropertyName} é obrigatório.")
            //    .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que 0 (zero).");
        }
    }
}
