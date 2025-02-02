using BusinessLogic.DTOs.Category;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class CategoryValidator: AbstractValidator<CategoryDto>
    {
        public CategoryValidator() 
        { 
            RuleFor(x => x.Name)
                .NotEmpty()
                .MinimumLength(6)
                .MaximumLength(50);
        }
    }
}
