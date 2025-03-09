using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Models;

namespace BusinessLogic.Interfaces
{
    public  interface IFilterValueService
    {
        Task<IEnumerable<FilterValueDto>> GetAllAsync();
        Task<FilterValueDto> CreateAsync(FilterValueCreationModel creationModel);
        Task<FilterValueDto> GetByIdAsync(int id);
        Task DeleteAsync(int id);
        Task DeleteByFilterId(int filterId);

    }
}
