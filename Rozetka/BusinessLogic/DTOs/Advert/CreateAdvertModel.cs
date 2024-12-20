using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.Advert
{
    public class CreateAdvertModel
    {
        public int CategoryId { get; set; }

        public DateTime Date { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string FirstImage { get; set; } = string.Empty;
    }
}
