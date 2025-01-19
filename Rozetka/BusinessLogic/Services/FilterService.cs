using AutoMapper;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Specifications;
using DataAccess.Repostories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    internal class FilterService : IFilterService
    {
        private readonly IRepository<Filter> filterRepo;
        private readonly IRepository<FilterValue> values;
        private readonly IMapper mapper;

        public FilterService(IRepository<Filter> filterRepo,
                             IRepository<FilterValue> values,
                             IMapper mapper)
        {
            this.filterRepo = filterRepo;
            this.values = values;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<FilterDto>> GetAll()
        {
            return mapper.Map<IEnumerable<FilterDto>> (await filterRepo.GetListBySpec(new FilterSpecs.GetAll()));
        }

        public async Task<IEnumerable<FilterDto>> GetByIds(IEnumerable<int> ids)
        {
            return mapper.Map<IEnumerable<FilterDto>>(await filterRepo.GetListBySpec(new FilterSpecs.GetByIds(ids)));
        }

        public async Task<FilterDto> GetByCategoryIdAsync(int categoryId)
        {
            return mapper.Map<FilterDto>(await filterRepo.GetItemBySpec(new FilterSpecs.GetCategoryFilters(categoryId)));
        }

        public async Task<IEnumerable<FilterValueDto>> GetValuesByIds(IEnumerable<int> ids)
        {
            return mapper.Map<IEnumerable<FilterValueDto>>(await values.GetListBySpec(new FilterSpecs.GetValues(ids)));
        }
    }
}
