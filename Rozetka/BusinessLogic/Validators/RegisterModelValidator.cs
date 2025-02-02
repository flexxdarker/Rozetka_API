﻿using BusinessLogic.DTOs.User;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class RegisterModelValidator: AbstractValidator<RegisterModel>
    {
        public RegisterModelValidator() 
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();
            RuleFor(x => x.Password)
                .NotEmpty();
            RuleFor(x => x.Surname)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(15);
            RuleFor(x=>x.Name)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(15);
            RuleFor(x=>x.Birthdate)
                .NotEmpty()
                .GreaterThan(new DateTime(1900, 1, 1)).WithMessage("Birthdate must be bigger that 1900")
                .LessThan(DateTime.Now).WithMessage("You from future?)");
        }
    }
}
