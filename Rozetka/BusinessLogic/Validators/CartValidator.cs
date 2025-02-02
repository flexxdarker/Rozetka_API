using BusinessLogic.DTOs.Cart;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class CartValidator: AbstractValidator<BasketDto>
    {
        public CartValidator() 
        {
            RuleFor(x => x.Count)
                .NotEmpty()
                .GreaterThanOrEqualTo(0);
        }
    }
}
