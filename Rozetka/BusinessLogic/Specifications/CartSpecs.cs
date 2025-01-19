using Ardalis.Specification;
using BusinessLogic.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Specifications
{
    internal class CartSpecs
    {
        public class GetAll: Specification<Basket>
        {
            public GetAll() => Query.Where(x => true);
        }
        public class GetId: Specification<Basket> 
        { 
            public GetId(int id) => Query.Where(x=>x.Id == id);
        }
    }
}
