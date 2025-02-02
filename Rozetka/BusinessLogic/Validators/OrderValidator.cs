using BusinessLogic.DTOs.Order;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Validators
{
    public class OrderValidator: AbstractValidator<OrderDto>
    {
        public OrderValidator() 
        { 
            RuleFor(x=>x.TotalPrice)
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.OrderDate)
                .NotEmpty()
                .LessThan(DateTime.Now);
        }
    }
}
