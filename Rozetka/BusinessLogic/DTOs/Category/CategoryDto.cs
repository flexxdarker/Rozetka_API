using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.Category
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public int? ParentCategoryId { get; set; }
        public IEnumerable<int>? Filters { get; set; } = new HashSet<int>();
        //public IEnumerable<CategoryDto> SubCategories { get; set; } = new HashSet<CategoryDto>();

    }
}
