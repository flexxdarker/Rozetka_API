﻿using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.Entities;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Specifications;
using DataAccess.Repositories;
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
        private readonly IRepository<Image> imageRepo;
        private readonly IFilterService filterService;
        private readonly IAdvertValueService advertValueService;
        private readonly IImageService imageService;

        public AdvertService(IMapper mapper, 
            IRepository<Advert> advertRepo,
            IFilterService filterService,
            IAdvertValueService advertValueService, 
            IImageService imageService)
        {
            this.mapper = mapper;
            this.advertRepo = advertRepo;
            this.filterService = filterService;
            this.advertValueService = advertValueService;
            this.imageService = imageService;
        }

        public async Task<IEnumerable<AdvertPrintDto>> GetAllAsync()
        {
            return mapper.Map<IEnumerable<AdvertPrintDto>>(await advertRepo.GetListBySpec(new AdvertSpecs.GetAll()));
        }

        public async Task<AdvertPrintDto> GetByIdAsync(int id)
        {
            return mapper.Map<AdvertPrintDto>(await advertRepo.GetItemBySpec(new  AdvertSpecs.GetById(id)));
        }

        private decimal ValidatePriceByCulture(string price)
        {
            CultureInfo[] cultures = {
            new CultureInfo("uk-UA"),
            new CultureInfo("en-US"),
            new CultureInfo("de-DE")
            };

            decimal _price;
            bool priceParsed = false;

            foreach (var culture in cultures)
            {
                if (Decimal.TryParse(price, NumberStyles.Number, culture, out _price) && !priceParsed)
                {
                    Console.WriteLine($"\n\n\n\nРозпізнано культуру: {culture.Name}");
                    Console.WriteLine($"\n\n\n\nЦіна: {_price}\n\n");
                    priceParsed = true;
                    return _price;
                }    
                if (priceParsed)
                    break;
            }
            throw new HttpException(Errors.IdMustBePositive, HttpStatusCode.BadRequest);
        }

        public async Task<AdvertDto> CreateAsync(AdvertCreateModel advertCreationModel)
        {
            var advert = mapper.Map<Advert>(advertCreationModel);

            advert.Price = ValidatePriceByCulture(advertCreationModel.Price);
            advert.Discount = ValidatePriceByCulture(advertCreationModel.Discount);

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
        //15;07   96
        public async Task<AdvertDto> EditAsync(AdvertEditModel editModel)
        {
            var advert = await advertRepo.GetItemBySpec(new AdvertSpecs.GetById(editModel.Id));

            mapper.Map(editModel, advert);

            advert.Price = ValidatePriceByCulture(editModel.Price);
            advert.Discount = ValidatePriceByCulture(editModel.Discount);

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
