using BusinessLogic.DTOs;

namespace BusinessLogic.Interfaces
{
    public interface ICategoryService
    {
         Task<IEnumerable<CategoryDto>> GetAllAsync();
         Task<IEnumerable<CategoryDto>> GetParentAsync();
         Task<IEnumerable<CategoryDto>> GetSubAsync(int parentId);
         Task<CategoryDto> GetByIdAsync(int id);
    }
}