using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Models;

namespace BusinessLogic.Interfaces
{
    public interface ICategoryService
    {
         Task<IEnumerable<CategoryDto>> GetAllAsync();
         Task<IEnumerable<CategoryTreeDto>> GetTreeAsync();
         Task<IEnumerable<CategoryDto>> GetParentAsync();
         Task<IEnumerable<CategoryDto>> GetSubAsync(int parentId);
         Task<CategoryDto> CreateAsync(CategoryCreationModel categoryCreationModel);
         Task<CategoryDto> EditAsync(CategoryCreationModel editModel);
         Task<CategoryDto> GetByIdAsync(int id);
         Task DeleteAsync(int id);
    }
}