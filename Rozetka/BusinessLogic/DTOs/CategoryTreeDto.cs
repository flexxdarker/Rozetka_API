using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs
{
    public class CategoryTreeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public int? ParentCategoryId { get; set; }
        public IEnumerable<int>? Filters { get; set; } = new HashSet<int>();
        public IEnumerable<CategoryTreeDto> SubCategories { get; set; } = new HashSet<CategoryTreeDto>();
    }
}
