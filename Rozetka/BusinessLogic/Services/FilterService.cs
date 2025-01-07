using AutoMapper;
using BusinessLogic.DTOs;
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
    }
}
