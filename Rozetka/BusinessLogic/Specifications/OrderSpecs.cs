using Ardalis.Specification;
using BusinessLogic.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Specifications
{
    internal class OrderSpecs
    {
        public class GetAll: Specification<Order>
        {
            public GetAll() => Query
                .Include(x => x.User)
                .Include(x=>x.OrderAdverts)
                .Include(x=>x.OrderStatus)
                .Where(x => true);
        }
        public class GetById : Specification<Order>
        {
            public GetById(int id) => Query.Where(x => x.Id == id);
        }
    }
}
