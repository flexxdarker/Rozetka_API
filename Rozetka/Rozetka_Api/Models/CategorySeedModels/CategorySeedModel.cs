namespace Rozetka_Api.Models.CategorySeedModels
{
    public partial class CategorySeedModel
    {
        public string Name { get; set; }     
        public List<CategorySeedModel> SubCategories { get; set; } = new List<CategorySeedModel>();
        public List<String> Filters { get; set; } = new List<String>();
    }
}
