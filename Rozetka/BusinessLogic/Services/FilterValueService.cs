using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Specifications;
using DataAccess.Repositories;
using System.Net;

namespace BusinessLogic.Services
{
    internal class FilterValueService : IFilterValueService
    {
        private readonly IMapper mapper;
        private readonly IRepository<FilterValue> filterValueRepo;
        public FilterValueService(IMapper mapper,
        IRepository<FilterValue> filterValueRepo)
        {
            this.mapper = mapper;
            this.filterValueRepo = filterValueRepo;
        }

        public async Task<FilterValueDto> CreateAsync(FilterValueCreationModel creationModel)
        {
            var filterValue = mapper.Map<FilterValue>(creationModel);
            await filterValueRepo.InsertAsync(filterValue);
            await filterValueRepo.SaveAsync();
            return mapper.Map<FilterValueDto>(filterValue);
        }

        public async Task DeleteAsync(int id)
        {
            await filterValueRepo.DeleteAsync(id);
            await filterValueRepo.SaveAsync();
        }

        public async Task<IEnumerable<FilterValueDto>> GetAllAsync()
        {
            return mapper.Map<IEnumerable<FilterValueDto>>(await filterValueRepo.GetListBySpec(new FilterValueSpecs.GetAll()));
        }

        public async Task<FilterValueDto> GetByIdAsync(int id)
        {
            return mapper.Map<FilterValueDto>(await filterValueRepo.GetItemBySpec(new FilterValueSpecs.GetById(id)));
        }
    }
}
