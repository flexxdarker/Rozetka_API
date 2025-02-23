using BusinessLogic.Models.UserModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterModel>
    {

        public RegisterValidator()
        {
            RuleFor(reg => reg.Email)
            .NotNull().WithMessage("Email cannot be null") // Гарантуємо, що не буде порожнім
            .NotEmpty().WithMessage("Email cannot be empty") // Якщо це рядок, то не має бути пробілів
            .EmailAddress().WithMessage("Invalid email format");

            RuleFor(reg => reg.Password)
            .NotEmpty().WithMessage("Please enter a password")
            .MinimumLength(5).WithMessage("Password must be at least 5 characters long");

            RuleFor(reg => reg.Name)
            .NotEmpty().WithMessage("Поле порожнє")
            .NotNull().WithMessage("Ім'я не може бути порожнім")
            .MaximumLength(24).WithMessage("Ім'я не може бути більшим за 24 символи")
            .MinimumLength(5).WithMessage("Ім'я не може мати менше 5 символів")
            .Matches("[A-Z]").WithMessage("Ім'я повинно містити хоч одну велику літеру")
            .Matches("[a-z]").WithMessage("Ім'я повинно містити хоч одну малу літеру");

            RuleFor(reg => reg.Surname)
            .NotEmpty().WithMessage("Поле порожнє")
            .NotNull().WithMessage("Прізвище не може бути порожнім")
            .MaximumLength(24).WithMessage("Прізвище не може бути більшим за 24 символи")
            .MinimumLength(5).WithMessage("Прізвище не може мати менше 5 символів")
            .Matches("[A-Z]").WithMessage("Прізвище повинно містити хоч одну велику літеру")
            .Matches("[a-z]").WithMessage("Прізвище повинно містити хоч одну малу літеру");
        }
    }
}
