using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.Entities;

namespace BusinessLogic.Models.FilterValueModels
{
    public class FilterValueCreationModel
    {
        public int FilterId { get; set; }
        public string Value { get; set; } = string.Empty;
    }
}
