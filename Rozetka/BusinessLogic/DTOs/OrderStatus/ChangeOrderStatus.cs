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
        public List<string> Names { get; set; } = new List<string>();
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Status { get; set; }
        public decimal TotalPrice { get; set; }
        public string DateCrated { get; set; }
        public List<string> ImagePaths { get; set; }
        public string ImageUser { get; set; }
    }
}
