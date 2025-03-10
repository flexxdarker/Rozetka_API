using BusinessLogic.DTOs.Category;
using BusinessLogic.Models.CategoryModels;

namespace BusinessLogic.Interfaces
{
    public interface ICategoryService
    {
         Task<IEnumerable<CategoryDto>> GetAllAsync();
         Task<IEnumerable<CategoryTreeDto>> GetTreeAsync();
         Task<IEnumerable<CategoryDto>> GetParentAsync();
         Task<IEnumerable<CategoryDto>> GetSubAsync(int parentId);
         Task<CategoryDto> CreateAsync(CategoryCreateModel categoryCreateModel);
         Task<CategoryDto> EditAsync(CategoryEditModel editModel);
         Task<CategoryDto> GetByIdAsync(int id);
         Task<CategoryTreeDto> GetByIdWithSubAsync(int id);
         Task DeleteAsync(int id);
    }
}