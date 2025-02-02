using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Advert;

namespace BusinessLogic.DTOs.Cart
{
    public class BasketDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public int Count { get; set; } = 1;
        public DateTime DateAdded { get; set; }
    }
}
