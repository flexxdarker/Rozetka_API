using static Rozetka_Api.Models.CategoryConfigModels.CategorySeedModel;

namespace Rozetka_Api.Models.CategoryConfigModels
{
    public partial class CategorySeedModel
    {
        public string Name { get; set; }     
        public List<CategorySeedModel> SubCategories { get; set; } = new List<CategorySeedModel>();
        public List<String> Filters { get; set; } = new List<String>();
    }
}
