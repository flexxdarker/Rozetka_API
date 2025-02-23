using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.FilterModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IFilterService
    {
        Task<IEnumerable<FilterDto>> GetAllAsync();
        Task<FilterDto> CreateAsync(FilterCreateModel createModel);
        Task<FilterDto> EditAsync(FilterEditModel editModel);
        Task<IEnumerable<FilterDto>> GetByIdsAsync(IEnumerable<int> ids);
        Task<IEnumerable<FilterValueDto>> GetValuesByIdsAsync(IEnumerable<int> ids);
        Task<FilterDto> GetByCategoryIdAsync(int categoryId);
        Task<FilterDto> GetByIdAsync(int Id);
        Task DeleteAsync(int id);
    }
}
