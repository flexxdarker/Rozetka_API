using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BusinessLogic.Models.CategoryModels
{
    public class CategoryCreateModel : BaseCategoryModel
    {
        public IFormFile? Image { get; set; }
    }
}
