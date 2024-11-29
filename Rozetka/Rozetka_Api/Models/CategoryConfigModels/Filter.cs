namespace Rozetka_Api.Models.CategoryConfigModels
{
    public partial class CategoryConfig
    {
        public class Filter
        {
            public string Name { get; set; }
            public List<string> Values { get; set; }
        }
    }
}
