using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Category;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.CategoryModels;

namespace BusinessLogic.Interfaces
{
    public interface IAdvertService
    {
         Task<IEnumerable<AdvertPrintDto>> GetAllAsync();
         Task<IEnumerable<AdvertPrintDto>> GetAllAsync(int catgoryId);
         Task<AdvertPrintDto> GetByIdAsync(int id);
         Task<AdvertDto> CreateAsync(AdvertCreateModel advertCreationModel);
         Task<AdvertDto> EditAsync(AdvertEditModel editModel);
         Task DeleteAsync(int id);
    }
}