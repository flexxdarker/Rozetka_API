using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.Filter
{
    public class FilterValueDto
    {
        public int Id { get; set; }
        public string Value { get; set; } = string.Empty;
        public int FilterId { get; set; }
        public string FilterName { get; set; } = string.Empty;
    }
}
