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
    internal class AdvertValueService : IAdvertValueService
    {
        private readonly IMapper mapper;
        private readonly IRepository<AdvertValue> advertValueRepo;
        private readonly IFilterService filtersService;
        public AdvertValueService(IMapper mapper,
        IFilterService filtersService,
        IRepository<AdvertValue> advertValueRepo)
        {
            this.mapper = mapper;
            this.filtersService = filtersService;
            this.advertValueRepo = advertValueRepo;
        }

        public async Task<IEnumerable<AdvertValueDto>> GetAllAsync() { 
            return mapper.Map<IEnumerable<AdvertValueDto>>(await advertValueRepo.GetListBySpec(new AdvertValueSpecs.GetAll()));
        }

        public async Task<AdvertValueDto> CreateAsync(AdvertValueCreationModel creationModel)
        {
            var advertValue = mapper.Map<AdvertValue>(creationModel);
            await advertValueRepo.InsertAsync(advertValue);
            await advertValueRepo.SaveAsync();
            return mapper.Map<AdvertValueDto>(advertValue);
        }

        public async Task CreateRangeAsync(Advert advert, IEnumerable<FilterValueDto> values)
        {
            var advertValues = new List<AdvertValueDto>();
            foreach (var value in values) {
                advertValues.Add(new AdvertValueDto { AdvertId = advert.Id, ValueId = value.Id });
            }
            await advertValueRepo.AddRangeAsync(mapper.Map<IEnumerable<AdvertValue>>(advertValues));
            await advertValueRepo.SaveAsync();
        }

        public async Task<IEnumerable<AdvertValueDto>> GetByIdsAsync(IEnumerable<int> ids)
        {
            return mapper.Map<IEnumerable<AdvertValueDto>>(await advertValueRepo.GetListBySpec(new AdvertValueSpecs.GetByIds(ids)));
        }

        public async Task DeleteAsync(int advertId)
        {
            var advertValue = mapper.Map<IEnumerable<AdvertValueDto>>(await advertValueRepo.GetListBySpec(new AdvertValueSpecs.GetByAdvertId(advertId)));
            foreach (var value in advertValue)
            {
                await advertValueRepo.DeleteAsync(value.Id);
                await advertValueRepo.SaveAsync();
            }
        }
    }
}
