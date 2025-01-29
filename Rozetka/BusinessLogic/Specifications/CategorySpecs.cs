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
    public class CategorySpecs
    {
        public class GetAll : Specification<Category>
        {
            public GetAll() => Query
                .Include(c => c.Filters)
                .ThenInclude(f => f.Filter)
                //.Where(x => x.IsDeleted != false); 
                .Where(x => true); 
        }
        
        public class GetParent : Specification<Category>
        {
            public GetParent() => Query.Where(x => x.ParentCategoryId == null);
        }
       
        public class GetSub : Specification<Category>
        {
            public GetSub(int parentId) => Query.Where(x => x.ParentCategoryId == parentId);
        }

        public class GetById : Specification<Category>
        {
            public GetById(int id) => Query.Where(x => x.Id == id).Include(x => x.SubCategories);
        }
        public class GetByName : Specification<Category>
        {
            public GetByName(string Name) => Query.Where(x => x.Name.ToLower() == Name);
        }
    }
}
    