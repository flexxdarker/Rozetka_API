﻿using AutoMapper;
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
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class AdvertService : IAdvertService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Advert> advertRepo;
        private readonly IFilterService filterService;
        private readonly IRepository<Category> categorytRepo;
        private readonly IAdvertValueService advertValueService;
        private readonly IImageService imageService;
        private readonly IValidator<AdvertCreateModel> advertCreateModelValidator;
        private readonly IValidator<Advert> advertValidator;

        public AdvertService(IMapper mapper, 
            IRepository<Advert> advertRepo,
            IFilterService filterService,
            IAdvertValueService advertValueService, 
            IImageService imageService, 
            IValidator<AdvertCreateModel> advertCreateModelValidator,
            IValidator<Advert> advertValidator,
            IRepository<Category> categorytRepo)
        {
            this.mapper = mapper;
            this.advertRepo = advertRepo;
            this.filterService = filterService;
            this.advertValueService = advertValueService;
            this.imageService = imageService;
            this.advertCreateModelValidator = advertCreateModelValidator;
            this.advertValidator = advertValidator;
            this.categorytRepo = categorytRepo;
        }

        public async Task<IEnumerable<AdvertPrintDto>> GetAllAsync()
        {
            return mapper.Map<IEnumerable<AdvertPrintDto>>(await advertRepo.GetListBySpec(new AdvertSpecs.GetAll()));
        }

        public async Task<AdvertPrintDto> GetByIdAsync(int id)
        {
            return mapper.Map<AdvertPrintDto>(await advertRepo.GetItemBySpec(new  AdvertSpecs.GetById(id)));
        }

        public async Task<AdvertDto> CreateAsync(AdvertCreateModel advertCreationModel)
        {
            advertCreateModelValidator.ValidateAndThrow(advertCreationModel);
            if (!await categorytRepo.AnyAsync(x => x.Id == advertCreationModel.CategoryId))
            {
                throw new HttpException(Errors.InvalidCategoryId, HttpStatusCode.BadRequest);
            }

            var advert = mapper.Map<Advert>(advertCreationModel);

            CultureInfo[] cultures = {
            new CultureInfo("uk-UA"),
            new CultureInfo("en-US"),
            new CultureInfo("de-DE")
            };

            decimal price, discount;
            bool priceParsed = false, discountParsed = false;

            foreach (var culture in cultures)
            {
                if (Decimal.TryParse(advertCreationModel.Price, NumberStyles.Number, culture, out price) && !priceParsed)
                {
                    advert.Price = price;
                    priceParsed = true;
                }
                if (Decimal.TryParse(advertCreationModel.Discount, NumberStyles.Number, culture, out discount) && !discountParsed)
                {
                    advert.Discount = discount;
                    discountParsed = true;
                }
                if (priceParsed && discountParsed)
                    break;
            }

            advertValidator.ValidateAndThrow(advert);
            
                
            var savedImages = await imageService.SaveImagesAsync(advertCreationModel.ImageFiles);

            advert.Images.Clear();
            for (int i = 0; i < savedImages.Count; i++)
            {
                advert.Images.Add(new Image
                {
                    Name = savedImages[i],
                    AdvertId = advert.Id,
                    Priority = i
                });
            }

            await advertRepo.InsertAsync(advert);
            await advertRepo.SaveAsync();

            if (advertCreationModel.Values?.Any() ?? false)
            {
                var values = await filterService.GetValuesByIdsAsync(advertCreationModel.Values);
                await advertValueService.CreateRangeAsync(advert, values);
            }
            return mapper.Map<AdvertDto>(advert);
        }

        public async Task DeleteAsync(int id)
        {
            var advert = mapper.Map<AdvertDto>(await advertRepo.GetItemBySpec(new AdvertSpecs.GetById(id)));
            if (advert != null)
            {
                await advertRepo.DeleteAsync(id);
                await advertRepo.SaveAsync();
                if (advert.Images != null) {
                    foreach (var image in advert.Images)
                    {
                       imageService.DeleteImageIfExists(image.Name);
                    }
                }
            }
        }
        public async Task<AdvertDto> EditAsync(AdvertEditModel editModel)
        {
            var advert = await advertRepo.GetItemBySpec(new AdvertSpecs.GetById(editModel.Id));

            mapper.Map(editModel, advert);

            if (editModel.ImageFiles != null)
            {
                imageService.DeleteImagesIfExists(advert.Images.Select(i => i.Name));

                var savedImages = await imageService.SaveImagesAsync(editModel.ImageFiles);

                advert.Images.Clear();
                for (int i = 0; i < savedImages.Count; i++) { 
                    
                    advert.Images.Add(new Image
                    {
                        Name = savedImages[i],
                        AdvertId = advert.Id,
                        Priority = i
                    });
                }
            }

            if (editModel.Values.Count() != 0)
            {
                await advertValueService.DeleteAsync(editModel.Id);
                foreach (var advertValue in editModel.Values)
                {
                    await advertValueService.CreateAsync(new AdvertValueCreationModel { AdvertId = editModel.Id, ValueId = advertValue });
                }
            }
            await advertRepo.SaveAsync();
            return mapper.Map<AdvertDto>(advert);

        }
    }
}
