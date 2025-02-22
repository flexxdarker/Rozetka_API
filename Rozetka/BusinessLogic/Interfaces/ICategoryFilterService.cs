using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Models;

namespace BusinessLogic.Interfaces
{
    public interface ICategoryFilterService
    {
         Task<IEnumerable<CategoryFilterDto>> GetAllAsync();
         Task<IEnumerable<CategoryFilterDto>> GetByCategoryIdAsync(int categoryId);
         Task<CategoryFilterDto> CreateAsync(CategoryFilterCreationModel creationModel);
         Task<CategoryFilterDto> EditAsync(CategoryFilterCreationModel editModel);
         Task CreateRangeAsync(Category category, IEnumerable<FilterDto> filters);
        Task DeleteAsync(int categoryId);

    }
}