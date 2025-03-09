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
                .MaximumLength(500).WithMessage(Errors.MaxSymbolsCountError + "500 symbols");
            RuleFor(x => x.Description)
                .MinimumLength(50).WithMessage(Errors.MinSymbolsCountError + " 50 symbols")
                .MaximumLength(5000).WithMessage(Errors.MaxSymbolsCountError + "5000 symbols");
        }
    }
}
