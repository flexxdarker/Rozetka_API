using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Entities
{
    public class FilterValue
    {
        public int Id { get; set; }
        public int FilterId { get; set; }
        public Filter Filter { get; set; }
        public string Value { get; set; } = string.Empty;
        public ICollection<Advert>? Adverts { get; set; } = new HashSet<Advert>();
    }
}
