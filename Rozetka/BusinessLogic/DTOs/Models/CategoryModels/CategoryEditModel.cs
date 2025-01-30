using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Models.CategoryModels;

namespace BusinessLogic.DTOs.Models
{
    public class CategoryEditModel : BaseCategoryModel
    {
        public int Id { get; set; }
    }
}
