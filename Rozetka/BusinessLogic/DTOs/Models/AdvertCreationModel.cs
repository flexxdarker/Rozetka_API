using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.Models
{
    public class AdvertCreationModel
    {
        public int CategoryId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public IEnumerable<int> Values { get; set; } = new HashSet<int>();

        //public string FirstImage { get; set; } = string.Empty;
    }
}
