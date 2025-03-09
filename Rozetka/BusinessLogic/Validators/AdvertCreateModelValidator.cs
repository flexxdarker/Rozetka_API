using BusinessLogic.DTOs.Advert;
using BusinessLogic.Models.AdvertModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class AdvertCreateModelValidator : AbstractValidator<AdvertCreateModel>
    {
        public AdvertCreateModelValidator() 
        {
            RuleFor(x => x.CategoryId)
                .NotNull()
                .GreaterThan(0).WithMessage(Errors.GreaterZeroError);
            RuleFor(x => x.Price)
                .NotEmpty().WithMessage(Errors.InvalidPriceError);
            RuleFor(x => x.Discount)
                .NotEmpty().WithMessage(Errors.InvalidPriceError);
            RuleFor(x => x.Title)
                .MinimumLength(3).WithMessage(Errors.MinSymbolsCountError + " 3 symbols")
                .MaximumLength(20).WithMessage(Errors.MaxSymbolsCountError + "20 symbols");
            RuleFor(x => x.Description)
                .MinimumLength(500).WithMessage(Errors.MinSymbolsCountError + " 500 symbols")
                .MaximumLength(5000).WithMessage(Errors.MaxSymbolsCountError + "5000 symbols");
        }
    }
}
