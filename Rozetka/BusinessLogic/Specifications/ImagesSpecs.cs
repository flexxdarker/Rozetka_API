using Ardalis.Specification;
using BusinessLogic.Entities;


namespace BusinessLogic.Specifications
{
    internal static class ImagesSpecs
    {
        public class GetByAdvertId : Specification<Image>
        {
            public GetByAdvertId(int id) => Query.Where(x => x.AdvertId == id);
        }

        public class GetFirstByAdvertIds : Specification<Image>
        {
            public GetFirstByAdvertIds(IEnumerable<int> ids) => Query.Where(x => ids.Any(z=>z==x.AdvertId && x.Priority == 0));
        }
    }
}
