using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Models.FilterValueModels;

namespace BusinessLogic.Interfaces
{
    public  interface IFilterValueService
    {
        Task<IEnumerable<FilterValueDto>> GetAllAsync();
        Task<FilterValueDto> GetByIdAsync(int id);
        Task<FilterValueDto> CreateAsync(FilterValueCreationModel creationModel);
        Task<FilterValueDto> EditAsync(FilterValueEditModel editModel);
        Task DeleteAsync(int id);
        Task DeleteByFilterId(int filterId);

    }
}
