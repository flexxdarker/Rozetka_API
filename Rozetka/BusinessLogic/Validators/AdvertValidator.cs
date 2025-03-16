using BusinessLogic.DTOs.Cart;
using BusinessLogic.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class AdvertValidator : AbstractValidator<Advert>
    {
        public AdvertValidator() 
        {
            RuleFor(x => x.Price)
                .NotEmpty().WithMessage(Errors.InvalidPriceError)
                .GreaterThan(0).WithMessage(Errors.GreaterZeroError);
            RuleFor(x => x.Discount)
                //.NotEmpty().WithMessage(Errors.InvalidPriceError)
                .GreaterThanOrEqualTo(0).WithMessage(Errors.GreaterEqualZeroError)
                .LessThanOrEqualTo(x => x.Price).WithMessage(Errors.DiscountGreaterOrEqualPrice);
        }
    }
}
