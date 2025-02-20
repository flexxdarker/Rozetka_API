using BusinessLogic.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.User
{
    public class LoginResponseDto
    {
        public bool IsSuccess { get; set; }
        public string AccessToken { get; set; }
        public string Error { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public List<int> Baskets { get; set; }
    }
}
