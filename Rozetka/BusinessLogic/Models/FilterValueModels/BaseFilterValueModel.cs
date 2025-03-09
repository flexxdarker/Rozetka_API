using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models.FilterValueModels
{
    public class BaseFilterValueModel
    {
        public int FilterId { get; set; }
        public string Value { get; set; } = string.Empty;
    }
}
