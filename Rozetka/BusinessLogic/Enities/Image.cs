
namespace BusinessLogic.Entities
{
    public class Image
    {
        public string Name { get; set; } = string.Empty;
        public int Priority { get; set; }
        public int AdvertId { get; set; }
        public Advert Advert { get; set; }
    }
}
