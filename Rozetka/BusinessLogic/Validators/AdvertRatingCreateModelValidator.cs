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
    public class AdvertRatingCreateModelValidator: AbstractValidator<AdvertRatingCreateModel>
    {
        public AdvertRatingCreateModelValidator() 
        {
            RuleFor(x => x.AdvertId)
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.Rating)
                .NotEmpty()
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(5);
        }
    }
}
