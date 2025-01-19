using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Entities
{
    public class AdvertValue
    {
        public int Id { get; set; }
        public int AdvertId { get; set; }
        public Advert Advert { get; set; }
        public int ValueId { get; set; }
        public FilterValue Value { get; set; }
    }
}
