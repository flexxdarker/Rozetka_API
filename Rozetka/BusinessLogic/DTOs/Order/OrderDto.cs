using BusinessLogic.DTOs.Advert;
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
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string UserId { get; set; }
        public string? UserName { get; set; }
        public decimal TotalPrice { get; set; }
        public ICollection<AdvertDto>? Adverts { get; set; }
    }
}
