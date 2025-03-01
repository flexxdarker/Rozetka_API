namespace Rozetka_Api.Models.FilterSeedModels
{
    public class FilterSeedModel
    {
        public string Name { get; set; }
        public List<string> Values { get; set; } = new List<string>();
    }
}
