using DataAccess.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Entities.Filter
{
    public class CategoryFilter
    {
        public int Id { get; set; }
        public int CategoryId { get; set; } 
        public Category Category { get; set; }
        public int FilterId { get; set; }
        public Filter Filter { get; set; }
    }
}
