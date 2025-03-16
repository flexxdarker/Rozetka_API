using BusinessLogic.DTOs.Basket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.Order
{
    public class BasketViewItem
    {
        public int Id { get; set; }
        public List<BasketItemInformationDto> Items { get; set; } = new HashSet<BasketItemInformationDto>().ToList();
    }
}
