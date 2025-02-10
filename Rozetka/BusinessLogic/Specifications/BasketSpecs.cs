using Ardalis.Specification;
using BusinessLogic.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Specifications
{
    public class BasketSpecs
    {
        public class GetAll: Specification<Basket> 
        {
            public GetAll() => Query
                .Include(x => x.Advert)
                .ThenInclude(a => a.Category)
                .Include(x => x.Advert.Images)
                .Where(x => true);
        }
        public class GetById: Specification<Basket>
        {

            public GetById(int id) => Query
                .Include(x => x.Advert)
                .ThenInclude(a => a.Category)
                .Include(x => x.Advert.Images)
                .Where(x=>x.Id == id);
        }

    }
}
