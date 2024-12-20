using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.Cart
{
    public class CartDto
    {
        public int UserId { get; set; }
        public decimal TotalSumm { get; set; }
    }
}
