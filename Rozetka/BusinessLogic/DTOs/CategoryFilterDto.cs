using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs
{
    public class CategoryFilterDto
    {
        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public int? FilterId { get; set; }
    }
}
