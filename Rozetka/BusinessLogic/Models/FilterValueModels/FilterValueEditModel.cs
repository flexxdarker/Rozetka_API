using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.Entities;

namespace BusinessLogic.Models.FilterValueModels
{
    public class FilterValueEditModel
    {
        public int Id { get; set; }
        public int FilterId { get; set; }
        public string Value { get; set; } = string.Empty;
    }
}
