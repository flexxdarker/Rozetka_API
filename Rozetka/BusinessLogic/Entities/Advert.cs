
namespace BusinessLogic.Entities
{
    public class Advert
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public ICollection<Image> Images { get; set; } = new HashSet<Image>();
        public ICollection<AdvertValue> Values { get; set; } = new HashSet<AdvertValue>();
    }
}
