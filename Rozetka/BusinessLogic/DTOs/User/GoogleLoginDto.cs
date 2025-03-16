using BusinessLogic.DTOs.Basket;
using BusinessLogic.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.User
{
    public class GoogleLoginDto /*: GoogleUserInfo*/
    {
        public string GoogleAccessToken { get; set; } = string.Empty;
        public AddAdvertDto Baskets { get; set; } = new AddAdvertDto();
        public List<OrderItemDto>? OrderItem { get; set; }
    }
}
