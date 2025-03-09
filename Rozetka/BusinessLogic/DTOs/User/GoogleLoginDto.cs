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
        public List<int> Baskets { get; set; } = new List<int>();
        public List<OrderItemDto>? OrderItems { get; set; }
    }
}
