using BusinessLogic.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.OrderStatus
{
    public class ChangeOrderStatus
    {
        public int Id { get; set; }
        public List<OrderItemInfo> Items { get; set; } = new List<OrderItemInfo>();
        public string userName { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; } 
        public string PhoneNumber { get; set; }
        public string Status { get; set; }
        public decimal TotalPrice { get; set; }
        public string DateCrated { get; set; }
        public string ImageUser { get; set; }
    }
}
