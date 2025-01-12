namespace Rozetka_Api.Models.CategoryConfigModels
{
    public class FilterSeedModel
    {
        public string Name { get; set; } 
        public List<string> Values { get; set; } = new List<string>();
    }

}
