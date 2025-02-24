using System.Text.Json.Serialization;
using BusinessLogic.DTOs.AdvertValue;

namespace BusinessLogic.DTOs.Advert
{
    public class AdvertPrintDto : AdvertDto
    {
        [JsonPropertyOrder(9)]
        public new IEnumerable<AdvertValuePrintDto>? Values { get; set; } = new HashSet<AdvertValuePrintDto>();
    }
}
