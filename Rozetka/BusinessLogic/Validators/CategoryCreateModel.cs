using BusinessLogic.DTOs.Category;
using BusinessLogic.Models.CategoryModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class CategoryCreateModelValidator : AbstractValidator<CategoryCreateModel>
    {
        public CategoryCreateModelValidator() 
        { 
            RuleFor(x => x.Name)
                .MinimumLength(3).WithMessage(Errors.MinSymbolsCountError + " 3 symbols")
                .MaximumLength(20).WithMessage(Errors.MaxSymbolsCountError + "20 symbols");
            RuleFor(x => x.ParentCategoryId)
                .NotNull()  
                .GreaterThan(0).WithMessage(Errors.GreaterZeroError);
            RuleFor(x => x.Image)
                .NotNull().WithMessage(Errors.NotNull);
        }
    }
}
