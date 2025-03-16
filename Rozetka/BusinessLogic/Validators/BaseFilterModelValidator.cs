using BusinessLogic.DTOs.Advert;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.FilterModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class BaseFilterModelValidator : AbstractValidator<BaseFilterModel>
    {
        public BaseFilterModelValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage(Errors.NotEmpty)
                .MinimumLength(3).WithMessage(Errors.MinSymbolsCountError + " 3 symbols")
                .MaximumLength(30).WithMessage(Errors.MaxSymbolsCountError + "30 symbols");

            When(x => x is FilterEditModel, () =>
            {
                RuleFor(x => ((FilterEditModel)x!).Id)
                    .GreaterThan(0).WithMessage(Errors.GreaterZeroError);
            });
        }
    }
}
