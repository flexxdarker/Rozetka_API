namespace BusinessLogic.DTOs.Advert
{
    public class AdvertDto
    {
        public int Id { get; set; }

        public int CategoryId { get; set; }

        public string CategoryName { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string FirstImage { get; set; } = string.Empty;
    }
}
