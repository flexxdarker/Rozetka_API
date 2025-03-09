using AutoMapper;
using BusinessLogic.DTOs.Category;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.CategoryModels;
using BusinessLogic.Models.FilterModels;
using BusinessLogic.Models.FilterValueModels;
using BusinessLogic.Specifications;
using BusinessLogic.Validators;
using DataAccess.Repositories;
using FluentValidation;
using MailKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    internal class FilterService : IFilterService
    {
        private readonly IRepository<Filter> filterRepo;
        private readonly IRepository<FilterValue> values;
        private readonly IValidator<BaseFilterModel> baseFilterModelValidator;
        private readonly IFilterValueService filterValueService;
        private readonly IMapper mapper;

        public FilterService(IRepository<Filter> filterRepo,
                             IRepository<FilterValue> values,
                             IMapper mapper,
                             IFilterValueService filterValueService,
                             IValidator<BaseFilterModel> baseFilterModelValidator)
        {
            this.filterRepo = filterRepo;
            this.values = values;
            this.mapper = mapper;
            this.filterValueService = filterValueService;
            this.baseFilterModelValidator = baseFilterModelValidator;
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
            baseFilterModelValidator.ValidateAndThrow(createModel);
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

        public async Task<FilterDto> EditAsync(FilterEditModel editModel)
        {
            baseFilterModelValidator.ValidateAndThrow(editModel);
            if (!await filterRepo.AnyAsync(x => x.Id == editModel.Id))
            {
                throw new HttpException(Errors.InvalidFilterId, HttpStatusCode.BadRequest);
            }
            var filter = await filterRepo.GetItemBySpec(new FilterSpecs.GetById(editModel.Id));

            mapper.Map(editModel, filter);

            if (editModel.FilerValues?.Any() ?? false)
            {
                await filterValueService.DeleteByFilterId(editModel.Id);
                foreach (var value in editModel.FilerValues)
                {
                    await filterValueService.CreateAsync(new FilterValueCreationModel { Value = value, FilterId = filter.Id });
                }
            }
            else filter.Values.Clear();

            await filterRepo.SaveAsync();
            return mapper.Map<FilterDto>(filter);
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
