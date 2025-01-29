using Ardalis.Specification;
using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BusinessLogic.Specifications
{
    public class CategoryFilterSpecs
    {
        public class GetAll : Specification<CategoryFilter>
        {
            public GetAll() => Query.Where(x => true); 
        }
        public class GetByCategoryId : Specification<CategoryFilter>
        {
            public GetByCategoryId(int categoryId) => Query.Where(x => x.CategoryId == categoryId);
        }
        public class GetById : Specification<Category>
        {
            public GetById(int id) => Query.Where(x => x.Id == id);
        }
    }
}
    