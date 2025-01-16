using BusinessLogic.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IFilterService
    {
        Task<IEnumerable<FilterDto>> GetAll();
        Task<IEnumerable<FilterDto>> GetByIds(IEnumerable<int> ids);
        Task<IEnumerable<FilterValueDto>> GetValuesByIds(IEnumerable<int> ids);
        Task<FilterDto> GetByCategoryIdAsync(int categoryId);

    }
}
