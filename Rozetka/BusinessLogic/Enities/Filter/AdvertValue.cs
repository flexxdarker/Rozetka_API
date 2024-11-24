using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Entities.Filter
{
    public class AdvertValue 
    {
        public int Id { get; set; }
        public int AdvertId { get; set; }
        public Advert Advert { get; set; }
        public int FilterValueId { get; set; }
        public FilterValue FilterValue { get; set; }

    }
}
