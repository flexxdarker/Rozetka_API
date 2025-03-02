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
    public class AdvertRatingSpecs
    {
        public class GetAll : Specification<AdvertRating>
        {
            public GetAll() => Query
                .Include(x => x.Advert)
                .Include(x => x.User)
                .Where(x => true);
        }
        public class GetById : Specification<AdvertRating>
        {
            public GetById(int id) => Query
                .Where(x => x.Id == id);
        }
    }
}
