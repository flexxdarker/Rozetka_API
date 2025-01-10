using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.Cart
{
    public class CreateCartModel
    {
        public string UserId { get; set; }
        public decimal TotalSumm { get; set; }
    }
}
