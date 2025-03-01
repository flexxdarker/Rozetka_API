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
    public class AdvertSpecs
    {
        public class GetAll : Specification<Advert>
        {
            public GetAll() => Query
                .Include(c => c.Values)
                .ThenInclude(f => f.Value)
                .ThenInclude(fv => fv.Filter)
                .Include(a => a.AdvertRatings)
                .Include(c => c.Images)
                .Where(x => true);
        }
        public class GetById : Specification<Advert>
        {
            public GetById(int id) => Query
                .Where(x => x.Id == id)
                .Include(c => c.Values)
                .ThenInclude(f => f.Value)
                .ThenInclude(fv => fv.Filter)
                .Include(a => a.AdvertRatings)
                .Include(c => c.Images);
        }
    }
}
