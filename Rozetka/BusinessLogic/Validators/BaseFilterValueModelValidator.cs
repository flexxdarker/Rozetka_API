using BusinessLogic.DTOs.Advert;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.FilterModels;
using BusinessLogic.Models.FilterValueModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class BaseFilterValueModelValidator : AbstractValidator<BaseFilterValueModel>
    {
        public BaseFilterValueModelValidator()
        {
            RuleFor(x => x.FilterId)
                .GreaterThan(0).WithMessage(Errors.GreaterZeroError);
            RuleFor(x => x.Value)
                .NotEmpty().WithMessage(Errors.NotEmpty)
                .NotNull().WithMessage(Errors.NotNull)
                .MaximumLength(30).WithMessage(Errors.MaxSymbolsCountError + " 30 symbols");

            When(x => x is FilterValueEditModel, () =>
            {
                RuleFor(x => ((FilterValueEditModel)x!).Id)
                    .GreaterThan(0).WithMessage(Errors.GreaterZeroError);
            });
        }
    }
}
