﻿using FluentValidation;
using FluentValidation.Results;
using CitelTestPratico.Aplicacao.Notificacoes;
using CitelTestPratico.Aplicacao.Notificacoes.Interfaces;
using CitelTestPratico.Dominio.Core.Models;

namespace CitelTestPratico.Aplicacao.Services
{
    public abstract class BaseService
    {
        protected readonly INotificador _notificador;

        protected BaseService(INotificador notificador)
        {
            _notificador = notificador;
        }

        protected void Notificar(ValidationResult validationResult)
        {
            foreach (var error in validationResult.Errors)
            {
                Notificar(error.ErrorMessage);
            }
        }

        protected void Notificar(string mensagem)
        {
            _notificador.Handle(new Notificacao(mensagem));
        }

        protected void Notificar(string mensagem, params object[] parametros)
        {
            _notificador.Handle(new Notificacao(string.Format(mensagem, parametros)));
        }

        protected bool ExecutarValidacao<TV, TE>(TV validacao, TE entidade)
            where TE : Entity
            where TV : AbstractValidator<TE>
        {
            var validator = validacao.Validate(entidade);

            if (validator.IsValid) return true;

            Notificar(validator);

            return false;
        }

        protected bool ExecutarValidacaoSimples<TV, TE>(TV validacao, TE entidade)
            where TE : class
            where TV : AbstractValidator<TE>
        {
            var validator = validacao.Validate(entidade);

            if (validator.IsValid) return true;

            Notificar(validator);

            return false;
        }
    }
}
