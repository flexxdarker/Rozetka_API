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
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Color { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public int Amount { get; set; }
        public List<string> ImagePaths { get; set; }
    }
}
