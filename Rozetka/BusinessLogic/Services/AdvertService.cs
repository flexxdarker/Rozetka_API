using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Models;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Specifications;
using DataAccess.Repostories;
using System;
using System.Collections.Generic;
using System.Globalization;
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

            CultureInfo[] cultures = {
            new CultureInfo("uk-UA"),
            new CultureInfo("en-US"),
            new CultureInfo("de-DE")
            };

            decimal price, discount;
            bool priceParsed = false, discountParsed = false;

            foreach (var culture in cultures)
            {
                if (Decimal.TryParse(advertCreationModel.Price, NumberStyles.Number, culture, out price) && !priceParsed) {
                    Console.WriteLine($"\n\n\n\nРозпізнано культуру: {culture.Name}");
                    Console.WriteLine($"\n\n\n\nЦіна: {price}\n\n");
                    advert.Price = price;
                    priceParsed = true;
                }
                if (Decimal.TryParse(advertCreationModel.Discount, NumberStyles.Number, culture, out discount) && !discountParsed) {
                    Console.WriteLine($"\n\n\n\nРозпізнано культуру: {culture.Name}");
                    Console.WriteLine($"Знижка: {discount}\n\n");
                    advert.Discount = discount;
                    discountParsed = true;
                }
                if (priceParsed && discountParsed)
                    break;
            }

            if (!priceParsed || !discountParsed)
            {
                Console.WriteLine("Не вдалося розпізнати культуру.");
            }

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
