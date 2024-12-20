using BusinessLogic.Enities;
using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.Order
{
    public class OrderDto
    {
        public DateTime OrderDate { get; set; }
        public int UserId { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
