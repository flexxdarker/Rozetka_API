using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Entities;
using BusinessLogic.Entities.Filter;
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
        private readonly IRepository<Filter> filters;
        private readonly IRepository<FilterValue> values;
        private readonly IMapper mapper;

        public FilterService(IRepository<Filter> filters,
                             IRepository<FilterValue> values,
                             IMapper mapper)
        {
            this.filters = filters;
            this.values = values;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<FilterValueDto>> GetAdvertValues(int advertId) =>
            mapper.Map<IEnumerable<FilterValueDto>>(await values.GetListBySpec(new FilterSpecs.GetAdvertValues(advertId)));
        

        public async Task<IEnumerable<FilterDto>> GetCategoryFilters(int categoryId) =>
            mapper.Map<IEnumerable<FilterDto>>(await filters.GetListBySpec(new FilterSpecs.GetCategoryFilters(categoryId)));
    }
}
