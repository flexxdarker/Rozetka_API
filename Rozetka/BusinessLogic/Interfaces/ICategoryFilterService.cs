using BusinessLogic.DTOs;
using BusinessLogic.Entities;

namespace BusinessLogic.Interfaces
{
    public interface ICategoryFilterService
    {
         Task<IEnumerable<CategoryFilterDto>> GetAllAsync();
         Task<IEnumerable<CategoryFilterDto>> GetByCategoryIdAsync(int categoryId);
         Task<CategoryFilterDto> CreateAsync(CategoryFilterCreationModel creationModel);
         Task CreateRangeAsync(Category category, IEnumerable<FilterDto> filters);

    }
}