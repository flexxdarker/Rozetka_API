
using BusinessLogic.Enities;
using System.Text.Json.Serialization;

namespace BusinessLogic.Entities
{
    public class AdvertRating
    {
        public int Id { get; set; }
        public int Rating {  get; set; }
        public int AdvertId { get; set; }
        public Advert Advert { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
