using BusinessLogic.DTOs.Advert;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class AdvertValidator: AbstractValidator<AdvertDto>
    {
        public AdvertValidator() 
        {
            RuleFor(x => x.Price)
                .NotEmpty()
                .GreaterThan(1);
            RuleFor(x => x.Title)
                .NotEmpty()
                .MinimumLength(6).WithMessage("Title must be more that 6 symbols");
            RuleFor(x => x.Description)
                .NotEmpty()
                .MinimumLength(100).WithMessage("Description must be more than 100 symbols");
            RuleFor(x => x.Date)
                .NotEmpty();
        }
    }
}
