using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Filter;

namespace BusinessLogic.Models.FilterModels
{
    public class BaseFilterModel
    {
        public string Name { get; set; } = string.Empty;
        public IEnumerable<string> FilerValues { get; set; } = new HashSet<string>();
    }
}
