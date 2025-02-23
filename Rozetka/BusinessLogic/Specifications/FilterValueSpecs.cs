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
    public class FilterValueSpecs
    {
        public class GetAll : Specification<FilterValue>
        {
            public GetAll() => Query.Where(x => true)
                .Include(x => x.Filter); 
        }
        public class GetByFilterId : Specification<FilterValue>
        {
            public GetByFilterId(int filterId) => Query.Where(x => x.FilterId == filterId);
        }
        public class GetById : Specification<FilterValue>
        {
            public GetById(int id) => Query.Where(x => x.Id == id);
        }
        public class GetByIds : Specification<FilterValue>
        {
            public GetByIds(IEnumerable<int> ids) => Query.Where(x => ids.Contains(x.Id));
        }
    }
}
    