using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using BusinessLogic.Models.FilterModels;
using BusinessLogic.Models.FilterValueModels;
using BusinessLogic.Specifications;
using DataAccess.Repositories;
using FluentValidation;
using System.Net;

namespace BusinessLogic.Services
{
    internal class FilterValueService : IFilterValueService
    {
        private readonly IMapper mapper;
        private readonly IRepository<FilterValue> filterValueRepo;
        private readonly IRepository<Filter> filterRepo;
        private readonly IValidator<FilterValueCreationModel> filterValueCreateModelValidator;

        public FilterValueService(IMapper mapper,
        IRepository<FilterValue> filterValueRepo,
        IRepository<Filter> filterRepo,
        IValidator<FilterValueCreationModel> filterValueCreateModelValidator)
        {
            this.mapper = mapper;
            this.filterValueRepo = filterValueRepo;
            this.filterRepo = filterRepo;
            this.filterValueCreateModelValidator = filterValueCreateModelValidator;
        }

        public async Task<FilterValueDto> CreateAsync(FilterValueCreationModel creationModel)
        {
            filterValueCreateModelValidator.ValidateAndThrow(creationModel);
            if(!await filterRepo.AnyAsync(x => x.Id == creationModel.FilterId))
            {
                throw new HttpException(Errors.InvalidFilterId, HttpStatusCode.BadRequest);
            }
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
        public async Task DeleteByFilterId(int filterId)
        {
            var filterValues = mapper.Map<IEnumerable<FilterValueDto>>(await filterValueRepo.GetListBySpec(new FilterValueSpecs.GetByFilterId(filterId)));
            foreach (var value in filterValues)
            {
                await filterValueRepo.DeleteAsync(value.Id);
                await filterValueRepo.SaveAsync();
            }
        }

        public async Task<FilterValueDto> EditAsync(FilterValueEditModel editModel)
        {
            var filterValue = await filterValueRepo.GetItemBySpec(new FilterValueSpecs.GetById(editModel.Id));

            mapper.Map(editModel, filterValue);

            await filterValueRepo.SaveAsync();
            return mapper.Map<FilterValueDto>(filterValue);
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
