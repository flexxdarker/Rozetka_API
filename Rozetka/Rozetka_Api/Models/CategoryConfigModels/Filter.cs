namespace Rozetka_Api.Models.CategoryConfigModels
{
    public partial class CategorySeedModel
    {
        public class FilterSeedModel
        {
            public string Name { get; set; }
            public List<string> Values { get; set; }
        }
    }
}
