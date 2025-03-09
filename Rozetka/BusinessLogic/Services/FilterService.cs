using AutoMapper;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.FilterModels;
using BusinessLogic.Specifications;
using BusinessLogic.Validators;
using DataAccess.Repositories;
using FluentValidation;
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
        private readonly IValidator<FilterCreateModel> filterCreateModelValidator;
        private readonly IFilterValueService filterValueService;
        private readonly IMapper mapper;

        public FilterService(IRepository<Filter> filterRepo,
                             IRepository<FilterValue> values,
                             IMapper mapper,
                             IFilterValueService filterValueService,
                             IValidator<FilterCreateModel> filterCreateModelValidator)
        {
            this.filterRepo = filterRepo;
            this.values = values;
            this.mapper = mapper;
            this.filterValueService = filterValueService;
            this.filterCreateModelValidator = filterCreateModelValidator;
        }

        public async Task<IEnumerable<FilterDto>> GetAllAsync()
        {
            return mapper.Map<IEnumerable<FilterDto>> (await filterRepo.GetListBySpec(new FilterSpecs.GetAll()));
        }

        public async Task<IEnumerable<FilterDto>> GetByIdsAsync(IEnumerable<int> ids)
        {
            return mapper.Map<IEnumerable<FilterDto>>(await filterRepo.GetListBySpec(new FilterSpecs.GetByIds(ids)));
        }
        public async Task<IEnumerable<FilterValueDto>> GetValuesByIdsAsync(IEnumerable<int> ids)
        {
            return mapper.Map<IEnumerable<FilterValueDto>>(await values.GetListBySpec(new FilterSpecs.GetValues(ids)));
        }

        public async Task<FilterDto> GetByIdAsync(int Id)
        {
            return mapper.Map<FilterDto>(await filterRepo.GetItemBySpec(new FilterSpecs.GetById(Id)));
        }

        public async Task<FilterDto> CreateAsync(FilterCreateModel createModel)
        {
            filterCreateModelValidator.ValidateAndThrow(createModel);
            var filter = mapper.Map<Filter>(createModel);

            await filterRepo.InsertAsync(filter);
            await filterRepo.SaveAsync();

            if (createModel.FilerValues.Any())
            {
                foreach (var filterValue in createModel.FilerValues)
                {
                    await filterValueService.CreateAsync(new FilterValueCreationModel { FilterId = filter.Id, Value = filterValue });
                }
            }

            return mapper.Map<FilterDto>(filter);
        }

        public Task<FilterDto> EditAsync(FilterEditModel editModel)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteAsync(int id)
        {
            var filter = mapper.Map<FilterDto>(await filterRepo.GetItemBySpec(new FilterSpecs.GetById(id)));
            if(filter != null)
            {
                await filterRepo.DeleteAsync(filter.Id);
                await filterRepo.SaveAsync();
            }
        }
    }
}
