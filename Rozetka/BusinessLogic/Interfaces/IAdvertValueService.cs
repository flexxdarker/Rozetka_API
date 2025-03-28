using BusinessLogic.DTOs.AdvertValue;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Models;

namespace BusinessLogic.Interfaces
{
    public interface IAdvertValueService
    {
        Task<IEnumerable<AdvertValueDto>> GetAllAsync();
        Task<AdvertValueDto> CreateAsync(AdvertValueCreationModel creationModel);
        Task CreateRangeAsync(Advert advert, IEnumerable<FilterValueDto> values);
        Task<IEnumerable<AdvertValueDto>> GetByIdsAsync(IEnumerable<int> ids);
        Task DeleteAsync(int advertId);

    }
}