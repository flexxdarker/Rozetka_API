using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs
{
    public class ImageDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Priority { get; set; }
        public int AdvertId { get; set; }
    }
}
