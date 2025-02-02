namespace BusinessLogic.DTOs.Advert
{
    public class AdvertDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public string FirstImage { get; set; } = string.Empty;
        public IEnumerable<int>? Values { get; set; } = new HashSet<int>();

    }
}
