using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BusinessLogic.Models.CategoryModels
{
    public abstract class BaseCategoryModel
    {
        public string Name { get; set; } = string.Empty;
        public int? ParentCategoryId { get; set; }
        public IFormFile? Image { get; set; }
        public IEnumerable<int> Filters { get; set; } = new HashSet<int>();
    }
}
