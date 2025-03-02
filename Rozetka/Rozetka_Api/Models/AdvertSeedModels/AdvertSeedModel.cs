namespace Rozetka_Api.Models.AdvertSeedModels
{
    public class AdvertSeedModel
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public int CategoryId { get; set; }
        public List<String> AdvertValues { get; set; } = new List<String>();
    }
}
