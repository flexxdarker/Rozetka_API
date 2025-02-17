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
    public class AdvertValueSpecs
    {
        public class GetAll : Specification<AdvertValue>
        {
            public GetAll() => Query.Where(x => true); 
        }
        public class GetByAdvertId : Specification<AdvertValue>
        {
            public GetByAdvertId(int advertId) => Query.Where(x => x.AdvertId == advertId);
        }
        public class GetByIds : Specification<AdvertValue>
        {
            public GetByIds(IEnumerable<int> ids) => Query.Where(x => ids.Contains(x.Id));
        }
    }
}
    