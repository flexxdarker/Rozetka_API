using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Advert;

namespace BusinessLogic.DTOs.Order
{
    public class CreateOrderModel
    {
        public DateTime OrderDate { get; set; }
        public string UserId { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
