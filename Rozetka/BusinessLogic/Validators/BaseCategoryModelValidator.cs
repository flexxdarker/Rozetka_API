using BusinessLogic.DTOs.Category;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.CategoryModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class BaseCategoryModelValidator : AbstractValidator<BaseCategoryModel>
    {
        public BaseCategoryModelValidator() 
        { 
            RuleFor(x => x.Name)
                .MinimumLength(3).WithMessage(Errors.MinSymbolsCountError + " 3 symbols")
                .MaximumLength(100).WithMessage(Errors.MaxSymbolsCountError + " 100 symbols");
            RuleFor(x => x.Image)
                .NotNull().WithMessage(Errors.NotNull);

            When(x => x is CategoryEditModel, () =>
            {
                RuleFor(x => ((CategoryEditModel)x!).Id)
                    .GreaterThan(0).WithMessage(Errors.GreaterZeroError);
            });
        }
    }
}
