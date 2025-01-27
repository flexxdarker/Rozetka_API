using BusinessLogic.DTOs.Order;
using BusinessLogic.Enities;
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
    public class BasketService : IBasketService
    {
        private readonly IRepository<Basket> _basket;
        private readonly IRepository<Advert> _advert;
        private readonly IRepository<OrderStatus> _status;
        private readonly IRepository<Order> _order;

        public BasketService(IRepository<OrderStatus> status, IRepository<Basket> basket, IRepository<Advert> advert, IRepository<Order> order)
        {
            _basket = basket;
            _advert = advert;
            _order = order;
            _status = status;
        }

        public async Task pushBasketById(string userId, int advertId)
        {

            var advert = await _advert.GetByIDAsync(advertId);

            var search = await _basket.GetAsync();

            var existingBasketItem = search.FirstOrDefault(b => b.AdvertId == advert.Id && b.UserId == userId);

            if (existingBasketItem == null)
            {
                // Якщо товар не знайдено в кошику, додаємо новий
                await _basket.InsertAsync(new Basket
                {
                    AdvertId = advert.Id,
                    UserId = userId,
                    DateAdded = DateTime.UtcNow
                });

                await _basket.SaveAsync();
            }
            else if (existingBasketItem != null)
            {
                var item = await _basket.GetItemBySpec(new BasketSpecs.GetById(existingBasketItem.Id));
                item.Count++;
                _basket.Update(item);
                await _basket.SaveAsync();
            }

        }
        public async Task pushBasketArray(string userId, int[] advertIds)
        {
            // Отримуємо всі товари
            var items = await _advert.GetAsync();
            var adverts = items.ToArray();

            // Отримуємо всі товари в кошику
            var baskets = await _basket.GetAsync();

            // Фільтруємо товари в кошику для конкретного користувача
            var existingBasketItems = baskets.Where(x => x.UserId == userId).ToList();

            // Список товарів для додавання у кошик
            List<Advert> returnAdvert = new List<Advert>();

            // Для кожного ID продукту перевіряємо його наявність
            foreach (var advertId in advertIds)
            {
                var advert = adverts.FirstOrDefault(p => p.Id == advertId);
                if (advert != null)
                {
                    returnAdvert.Add(advert);
                }
            }

            foreach (var advert in returnAdvert)
            {
                // Перевіряємо, чи вже є цей товар у кошику
                var existingItem = existingBasketItems.FirstOrDefault(b => b.AdvertId == advert.Id);
                if (existingItem == null)
                {
                    // Додаємо новий товар у кошик
                    await _basket.InsertAsync(new Basket
                    {
                        AdvertId = advert.Id,
                        UserId = userId,
                        DateAdded = DateTime.UtcNow
                    });
                }
                else if (existingItem != null)
                {
                    var item = await _basket.GetItemBySpec(new BasketSpecs.GetById(existingItem.Id));
                    item.Count++;
                    _basket.Update(item);
                    await _basket.SaveAsync();
                }
            }

            await _basket.SaveAsync();
        }

        public async Task<List<BasketViewItem>> GetBasketItems(string userId)
        {
            var items = await _basket.GetListBySpec(new BasketSpecs.GetAll());
            var basketItems = items
                .Where(x => x.UserId == userId)
                .Select(x => new BasketViewItem
                {
                    Id = x.AdvertId,
                    Name = x.Advert.Title,
                    Description = x.Advert.Description,
                    Price = x.Advert.Price,
                    Category = x.Advert.Category.Name,
                    Amount = x.Count,
                    ImagePaths = x.Advert.Images.Select(pi => pi.Name).ToList()
                }).ToList();

            return basketItems;
        }
        public async Task<List<BasketViewItem>> GetBasketItemsLogout()
        {
            var array = _basket.GetListBySpec(new BasketSpecs.GetAll());
            if (array == null)
            {
                return new List<BasketViewItem>();
            }

            var items = await _basket.GetListBySpec(new BasketSpecs.GetAll());
            var basketItems = items
                .Select(x => new BasketViewItem
                {
                    Id = x.Id,
                    Name = x.Advert.Title,
                    Description = x.Advert.Description,
                    Price = x.Advert.Price,
                    Category = x.Advert.Category.Name,
                    Amount = x.Count,
                    ImagePaths = x.Advert.Images.Select(pi => pi.Name).ToList()
                }).ToList();

            return basketItems;
        }

        public async Task<List<BasketViewItem>> DeleteProductFromBasket(string userId, int advertId)
        {
            var advert = await _advert.GetByIDAsync(advertId);

            var searсh = await _basket.GetListBySpec(new BasketSpecs.GetAll());

            var existingBasketItem = searсh.FirstOrDefault(b => b.AdvertId == advert.Id && b.UserId == userId);
            if(existingBasketItem != null)
            {
                 _basket.Delete(advertId);
            }
            await _basket.SaveAsync();
            var items = await _basket.GetListBySpec(new BasketSpecs.GetAll());
            var basketItems = items
                .Select(x => new BasketViewItem
                {
                    Id = x.Id,
                    Name = x.Advert.Title,
                    Description = x.Advert.Description,
                    Price = x.Advert.Price,
                    Category = x.Advert.Category.Name,
                    Amount = x.Count,
                    ImagePaths = x.Advert.Images.Select(pi => pi.Name).ToList()
                }).ToList();
            return basketItems;
        }

        public async Task PushOrderWhenLogin(string userId, List<OrderItemDto> orderItems)
        {

            var status = await _status.GetAsync();
            var statusItem = status.Where(x => x.isCompleted == true).FirstOrDefault();

            var amount = orderItems.FirstOrDefault().Amount;

            var order = new Order
            {
                UserId = userId,
                OrderStatusId = statusItem.Id,
                DateCrated = DateTime.UtcNow,
                Amount = amount
            };

            await _order.InsertAsync(order);
            await _order.SaveAsync();


            var listProduct = new List<OrderAdvert>();

            foreach (var item in orderItems)
            {
                listProduct.Add(
                    new OrderAdvert
                    {
                        OrderId = order.Id,
                        AdvertId = item.ProductId,
                        Count = item.Count,
                        Price = item.Price
                    });
            }


            foreach(var item in listProduct)
            {
                await _order.InsertAsync(item.Order);

            }

            await _order.SaveAsync();

            foreach (var item in orderItems)
            {
                await DeleteProductFromBasket(userId, item.ProductId);
            }

            await _order.SaveAsync();
        }
    }
}
