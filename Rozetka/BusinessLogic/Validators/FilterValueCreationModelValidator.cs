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
    public class FilterValueCreationModelValidator : AbstractValidator<FilterValueCreationModel>
    {
        public FilterValueCreationModelValidator()
        {
            RuleFor(x => x.FilterId)
                .GreaterThan(0).WithMessage(Errors.GreaterZeroError);
            RuleFor(x => x.Value)
                .NotNull().WithMessage(Errors.NotNull)
                .MaximumLength(30).WithMessage(Errors.MaxSymbolsCountError + " 30 symbols");
        }
    }
}
