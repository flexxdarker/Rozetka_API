using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Advert;

namespace BusinessLogic.DTOs.Order
{
    public class OrderInformationDto
    {
        public int Id { get; set; }
        public List<OrderItemInfo> OrderItems { get; set; }
        public string Status { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
