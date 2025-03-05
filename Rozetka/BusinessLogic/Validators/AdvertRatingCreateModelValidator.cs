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
                .GreaterThan(0).WithMessage(Errors.GreaterZeroError);
            RuleFor(x => x.Rating)
                .GreaterThanOrEqualTo(0).WithMessage(Errors.GreaterEqualZeroError)
                .LessThanOrEqualTo(5).WithMessage(Errors.RatingLessThanOrEqualTo5);
        }
    }
}
