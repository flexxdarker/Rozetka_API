using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;

namespace BusinessLogic.Interfaces
{
    public interface IAdvertValueService
    {
         Task<IEnumerable<AdvertValueDto>> GetAllAsync();
         Task<AdvertValueDto> CreateAsync(AdvertValueCreationModel creationModel);
         Task CreateRangeAsync(Advert advert, IEnumerable<FilterValueDto> values);

    }
}