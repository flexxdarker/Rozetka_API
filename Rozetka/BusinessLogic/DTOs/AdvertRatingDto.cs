namespace BusinessLogic.DTOs.Advert
{
    public class AdvertRatingDto
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public int AdvertId { get; set; }
        public string UserId { get; set; }
    }
}
