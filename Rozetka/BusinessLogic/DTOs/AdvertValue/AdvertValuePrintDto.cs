using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.AdvertValue
{
    public class AdvertValuePrintDto
    {
        public string FilterName { get; set; } = string.Empty;
        public IEnumerable<string>? ValueNames { get; set; } = new HashSet<string>();
    }
}
