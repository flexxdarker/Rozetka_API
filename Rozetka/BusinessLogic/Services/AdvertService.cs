using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Models;
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
    public class AdvertService : IAdvertService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Advert> advertRepo;
        private readonly IFilterService filterService;
        private readonly IAdvertValueService advertValueService;
        public AdvertService(IMapper mapper, 
            IRepository<Advert> advertRepo,
            IFilterService filterService,
            IAdvertValueService advertValueService)
        {
            this.mapper = mapper;
            this.advertRepo = advertRepo;
            this.filterService = filterService;
            this.advertValueService = advertValueService;
        }

        public async Task<AdvertDto> CreateAsync(AdvertCreationModel advertCreationModel)
        {
            var advert = mapper.Map<Advert>(advertCreationModel);
            advert.Date = DateTime.UtcNow;
            await advertRepo.InsertAsync(advert);
            await advertRepo.SaveAsync();

            if (advertCreationModel.Values?.Any() ?? false)
            {
                var values = await filterService.GetValuesByIds(advertCreationModel.Values);
                await advertValueService.CreateRangeAsync(advert, values);
            }
            return mapper.Map<AdvertDto>(advert);
        }

        public async Task<IEnumerable<AdvertDto>> GetAllAsync()
        {
            return mapper.Map<IEnumerable<AdvertDto>>(await advertRepo.GetListBySpec(new AdvertSpecs.GetAll()));
        }

        public Task<AdvertDto> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
