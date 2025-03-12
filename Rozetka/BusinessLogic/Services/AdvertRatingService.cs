using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.Entities;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Specifications;
using BusinessLogic.Validators;
using DataAccess.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class AdvertRatingService : IAdvertRatingService
    {
        private readonly IMapper mapper;
        private readonly IRepository<AdvertRating> advertRatingRepo;
        private readonly IRepository<Advert> advertRepo;
        private readonly IValidator<AdvertRatingCreateModel> advertRatingValidator;
        public AdvertRatingService(IMapper mapper, 
            IRepository<AdvertRating> advertRatingRepo,
            IValidator<AdvertRatingCreateModel> advertRatingValidator,
            IRepository<Advert> advertRepo)
        {
            this.mapper = mapper;
            this.advertRatingRepo = advertRatingRepo;
            this.advertRatingValidator = advertRatingValidator;
            this.advertRepo = advertRepo;
        }

        public async Task<AdvertRatingDto> CreateAsync(AdvertRatingCreateModel advertRatingCreateModel, string currentUserId)
        {
            advertRatingValidator.ValidateAndThrow(advertRatingCreateModel);
            if (!await advertRepo.AnyAsync(x => x.Id == advertRatingCreateModel.AdvertId))
            {
                throw new HttpException(Errors.InvalidAdvertId, HttpStatusCode.BadRequest);
            }

            var advertRating = mapper.Map<AdvertRating>(advertRatingCreateModel);

            advertRating.UserId = currentUserId;
            await advertRatingRepo.InsertAsync(advertRating);
            await advertRatingRepo.SaveAsync();

            return mapper.Map<AdvertRatingDto>(advertRating);
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
