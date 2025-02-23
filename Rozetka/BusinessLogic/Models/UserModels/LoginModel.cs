using BusinessLogic.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models.UserModels
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public List<int> Baskets { get; set; } = new List<int>();
        public List<OrderItemDto>? OrderItem { get; set; }
    }
}
