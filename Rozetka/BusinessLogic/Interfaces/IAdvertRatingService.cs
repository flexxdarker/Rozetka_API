using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Category;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.CategoryModels;

namespace BusinessLogic.Interfaces
{
    public interface IAdvertRatingService
    {
         Task<IEnumerable<AdvertRatingDto>> GetAllAsync();
         Task<AdvertRatingDto> GetByIdAsync(int id);
         Task<AdvertRatingDto> CreateAsync(AdvertRatingCreateModel advertRatingCreateModel, string currentUserId);
         Task DeleteAsync(int id);
    }
}