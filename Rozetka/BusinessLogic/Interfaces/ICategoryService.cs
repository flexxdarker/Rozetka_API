using BusinessLogic.DTOs.Category;

namespace BusinessLogic.Interfaces
{
    public interface ICategoryService
    {
         Task<IEnumerable<CategoryDto>> GetAllAsync();
         Task<CategoryDto> GetByIdAsync(int id);
    }
}