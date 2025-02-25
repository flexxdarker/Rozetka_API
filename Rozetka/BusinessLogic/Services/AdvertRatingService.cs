using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Specifications;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class AdvertRatingService : IAdvertRatingService
    {
        private readonly IMapper mapper;
        private readonly IRepository<AdvertRating> advertRatingRepo;

        public AdvertRatingService(IMapper mapper, 
            IRepository<AdvertRating> advertRatingRepo)
        {
            this.mapper = mapper;
            this.advertRatingRepo = advertRatingRepo;
        }

        public async Task<AdvertRatingDto> CreateAsync(AdvertRatingCreateModel advertRatingCreateModel, string currentUserId)
        {
            var advertRating = mapper.Map<AdvertRating>(advertRatingCreateModel);
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<AdvertRatingDto>> GetAllAsync()
        {
            return mapper.Map<IEnumerable<AdvertRatingDto>>(await advertRatingRepo.GetListBySpec(new AdvertRatingSpecs.GetAll()));
        }

        public async Task<AdvertRatingDto> GetByIdAsync(int id)
        {
            return mapper.Map<AdvertRatingDto>(await advertRatingRepo.GetItemBySpec(new AdvertRatingSpecs.GetById(id)));
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

    }
}
