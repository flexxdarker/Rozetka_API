using Ardalis.Specification;
using BusinessLogic.Entities;
using Microsoft.AspNetCore.Authentication.OAuth.Claims;

namespace BusinessLogic.Specifications
{
    public static class FilterSpecs
    {
        public class GetValues : Specification<FilterValue>
        {
            public GetValues(IEnumerable<int> ids) => Query.Where(x => ids.Contains(x.Id));
        }

        public class GetAll : Specification<Filter>
        {
            public GetAll() => Query.Where(x => true)
                .Include(x => x.Values);
        }
        public class GetById : Specification<Filter>
        {
            public GetById(int id) => Query.Where(x => x.Id == id);
        }
        public class GetByCategoryId  : Specification<Filter>
        {
            public GetByCategoryId(int categoryId) => Query.Where(x => x.Categories.Where(y => y.CategoryId == categoryId).Select(x => x.Filter) != null);
        }

        public class GetByIds : Specification<Filter>
        {
            public GetByIds(IEnumerable<int> ids) => Query.Where(x => ids.Contains(x.Id));
        }
    }
}
