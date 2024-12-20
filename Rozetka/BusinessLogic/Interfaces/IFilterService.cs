using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IFilterService
    {
       
        Task<IEnumerable<FilterDto>> GetCategoryFilters(int categoryId);
        Task<IEnumerable<FilterValueDto>> GetAdvertValues(int advertId);
    }
}
