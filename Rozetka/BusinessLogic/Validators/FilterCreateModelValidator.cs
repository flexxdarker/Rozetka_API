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
    public class FilterCreateModelValidator : AbstractValidator<FilterCreateModel>
    {
        public FilterCreateModelValidator()
        {
            RuleFor(x => x.Name)
                .MinimumLength(3).WithMessage(Errors.MinSymbolsCountError + " 3 symbols")
                .MaximumLength(30).WithMessage(Errors.MaxSymbolsCountError + "30 symbols");
        }
    }
}
