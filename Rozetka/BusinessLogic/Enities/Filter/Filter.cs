using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Entities.Filter
{
    public class Filter 
    {
        public string Name { get; set; } = string.Empty;
        public ICollection<FilterValue> Values { get; set; } = new HashSet<FilterValue>();
        public ICollection<CategoryFilter> Filters { get; set; } = new HashSet<CategoryFilter>();
    }
}
