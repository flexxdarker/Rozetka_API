using BusinessLogic.Models.UserModels;
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
                .NotEmpty().WithMessage(Errors.NotEmpty)
                .Matches(@"^[^@\s]+@[^@\s]+\.[^@\s]+$").WithMessage(Errors.InvalidEmail)
                .MinimumLength(5).WithMessage(Errors.MinSymbolsCountError + " 5 symbols")
                .MaximumLength(50).WithMessage(Errors.MaxSymbolsCountError + " 50 symbols");
            RuleFor(x => x.PhoneNumber)
               .NotEmpty().WithMessage(Errors.NotEmpty)
               .Must(x => x[0] == '+').WithMessage(Errors.InvalidPhoneNumber)
               .MinimumLength(10).WithMessage(Errors.MinSymbolsCountError + " 10 symbols")
               .MaximumLength(15).WithMessage(Errors.MaxSymbolsCountError + " 15 symbols");
            RuleFor(x => x.Password)
                .MinimumLength(8).WithMessage(Errors.MinSymbolsCountError + " 8 symbols")
                .MaximumLength(1000).WithMessage(Errors.MaxSymbolsCountError + " 1000 symbols")
                .NotEmpty().WithMessage(Errors.NotEmpty);
            RuleFor(x => x.Surname)
                .NotEmpty().WithMessage(Errors.NotEmpty)
                .MinimumLength(2).WithMessage(Errors.MinSymbolsCountError + " 2 symbols")
                .MaximumLength(15).WithMessage(Errors.MaxSymbolsCountError + " 15 symbols");
            RuleFor(x=>x.Name)
                .NotEmpty().WithMessage(Errors.NotEmpty)
                .MinimumLength(2).WithMessage(Errors.MinSymbolsCountError + " 2 symbols")
                .MaximumLength(15).WithMessage(Errors.MaxSymbolsCountError + " 15 symbols");
            RuleFor(x=>x.Birthdate)
                .NotEmpty().WithMessage(Errors.NotEmpty)
                .GreaterThan(new DateTime(1900, 1, 1)).WithMessage(Errors.DateTooBig + " 1900 year")
                .LessThan(DateTime.Now).WithMessage(Errors.DateTooSmall + $" {DateTime.Now}");
            RuleFor(x => x.Avatar)
                .NotEmpty().WithMessage(Errors.NotEmpty)
                .NotNull().WithMessage(Errors.NotNull);
        }
    }
}
