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
            public GetAll() => Query.Where(x => true);
        }
    }
}
