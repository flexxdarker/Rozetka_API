using Ardalis.Specification;
using BusinessLogic.Entities;

namespace BusinessLogic.Specifications
{
    public static class FilterSpecs
    {
        public class GetValues : Specification<FilterValue>
        {
            public GetValues(int[] ids) => Query.Where(x => ids.Contains(x.Id));
        }

        public class GetAll : Specification<Filter>
        {
            public GetAll() => Query.Where(x => true);
        }
        public class GetById : Specification<Filter>
        {
            public GetById(int id) => Query.Where(x => x.Id == id);
        }
    }
}
