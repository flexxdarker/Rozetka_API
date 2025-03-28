﻿using BusinessLogic.DTOs.Basket;
using BusinessLogic.DTOs.Order;
using BusinessLogic.Enities;
using BusinessLogic.Entities;
using BusinessLogic.Exceptions;
using BusinessLogic.Interfaces;
using BusinessLogic.Specifications;
using DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
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
        private readonly IRepository<OrderAdvert> _orderadvert;
        private readonly IRepository<Image> _imageRepo;

        public BasketService(IRepository<OrderStatus> status, IRepository<Basket> basket, IRepository<Advert> advert, IRepository<Order> order, IRepository<OrderAdvert> orderadvert, IRepository<Image> imageRepo)
        {
            _basket = basket;
            _advert = advert;
            _order = order;
            _status = status;
            _orderadvert = orderadvert;
            _imageRepo = imageRepo;
        }

        public async Task pushBasketById(string userId, int advertId, int amount)//todo: add amount of product
        {

            var advert = await _advert.GetByIDAsync(advertId);
            if (advert == null)
            {
                throw new Exception("Advert not found");
            }

            var search = await _basket.GetAsync();
            var existingBasketItem = search.FirstOrDefault(b => b.AdvertId == advert.Id && b.UserId == userId);

            var imagePath = await _imageRepo.AsQueryable()
                .Where(x => x.AdvertId == advert.Id)
                .Select(x => x.Name)
                .FirstOrDefaultAsync() ?? "default-image.jpg"; // Додаємо дефолтне зображення

            if (existingBasketItem == null)
            {
                // Якщо товар не знайдено в кошику, додаємо новий
                await _basket.InsertAsync(new Basket
                {
                    AdvertId = advert.Id,
                    UserId = userId,
                    DateAdded = DateTime.UtcNow,
                    Count = amount,
                    ImagePath = imagePath
                });

                await _basket.SaveAsync();
            }
            else
            {
                var item = await _basket.GetItemBySpec(new BasketSpecs.GetById(existingBasketItem.Id));
                item.Count += amount;
                _basket.Update(item);
                await _basket.SaveAsync();
            }

        }
        public async Task pushBasketArray(string userId, AddAdvertDto addAdvert)//todo: add amount of adverts
        {
            if(addAdvert.AdvertsIds.Count != addAdvert.Amount.Count)
            {
                throw new HttpException("Invalid Value", System.Net.HttpStatusCode.BadRequest);
            }

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
            foreach (var advertId in addAdvert.AdvertsIds)
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
                int i = 0;
                var existingItem = existingBasketItems.FirstOrDefault(b => b.AdvertId == advert.Id);

                var imagePath = await _imageRepo.AsQueryable()
                .Where(x => x.AdvertId == advert.Id)
                .Select(x => x.Name)
                .FirstOrDefaultAsync() ?? "default-image.jpg";


                if (existingItem == null)
                {
                    // Додаємо новий товар у кошик
                    await _basket.InsertAsync(new Basket
                    {
                        AdvertId = advert.Id,
                        UserId = userId,
                        DateAdded = DateTime.UtcNow,
                        Count = addAdvert.Amount[i],
                        ImagePath = imagePath
                    });
                }
                else if (existingItem != null)
                {
                    var item = await _basket.GetItemBySpec(new BasketSpecs.GetById(existingItem.Id));
                    item.Count += addAdvert.Amount[i];
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
                    Items = new List<BasketItemInformationDto> // Fixing the type conversion issue
                    {
                        new BasketItemInformationDto
                        {
                            Id = x.AdvertId,
                            Name = x.Advert.Title,
                            Price = x.Advert.Price,
                            Quantity = x.Count,
                            ImagePath = x.ImagePath,
                            Discount = x.Advert.Discount,
                            Category = x.Advert.Category.Name,
                            Description = x.Advert.Description
                        }
                    }
                }).ToList();

            return basketItems;
        }

        public async Task DeleteProductFromBasket(string userId, int advertId)
        {

            var searсh = _basket.AsQueryable().FirstOrDefault(x=>x.UserId == userId && x.AdvertId == advertId);

            if(searсh != null)
            {
                try
                {
                    _basket.Delete(searсh.Id);
                    await _basket.SaveAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        public async Task<OrderInformationDto> PushOrder(string userId/*, List<OrderItemDto> orderItems*/)
        {   
            var orderItems = await GetBasketItems(userId);

            var newStatus = await _status.AsQueryable().Where(x => x.Id == 1).FirstOrDefaultAsync();

            decimal amount = orderItems.Sum(item => item.Items.Sum(x => x.Price * x.Quantity));
            decimal dicount = orderItems.Sum(item=>item.Items.Sum(x=>x.Discount * x.Quantity));
            decimal totalAmount = amount - dicount;

            var order = new Order
            {
                UserId = userId,
                Amount = totalAmount,
                DateCrated = DateTime.UtcNow,
                OrderStatusId = newStatus.Id
            };

            await _order.InsertAsync(order);
            await _order.SaveAsync();

            var listAdvert = new List<OrderAdvert>();

            foreach (var advert in orderItems)
            {
                int i = 0;
                listAdvert.Add(new OrderAdvert
                {
                    OrderId = order.Id,
                    AdvertId = advert.Id,
                    Count = advert.Items[i].Quantity,
                    Price = advert.Items[i].Price,
                });
                i++;
            }

            await _orderadvert.AddRangeAsync(listAdvert);

            await _orderadvert.SaveAsync();

            foreach(var advert in orderItems)
            {
                await DeleteProductFromBasket(userId, advert.Id);
            }

             await _basket.SaveAsync();


            return new OrderInformationDto
            {
                Id = order.Id,
                Status = order.OrderStatus.Status,
                OrderItems = order.OrderAdverts.Select(y => new OrderItemInfo
                {
                    Id = y.Advert.Id,
                    Name = y.Advert.Title,
                    Price = y.Price,
                    Quantity = y.Count,
                    ImagePath = y.Advert.Images.FirstOrDefault().Name,
                    Discount = y.Advert.Discount
                }).ToList(),
                CreateTime = order.DateCrated,
                TotalPrice = order.Amount,
            };
        }

        public async Task PushOrderWhenLogin(string userId, List<OrderItemDto> orderItems)
        {
            var status = await _status.AsQueryable().Where(x => x.Id == 1).FirstOrDefaultAsync();
            
            var amount = orderItems.Select(x=>x.Price*x.Count).Sum();

            var order = new Order
            {
                UserId = userId,
                OrderStatusId = status.Id,
                DateCrated = DateTime.UtcNow,
                Amount = amount,
            };
            await _order.InsertAsync(order);
            await _order.SaveAsync();

            var listAdvert = new List<OrderAdvert>();

            foreach (var advert in orderItems)
            {
                listAdvert.Add(new OrderAdvert
                {
                    OrderId = order.Id,
                    AdvertId = advert.AdvertId,
                    Count = advert.Count,
                    Price = advert.Price,
                });
            }
            await _orderadvert.AddRangeAsync(listAdvert);

            await _orderadvert.SaveAsync();

            foreach (var advert in orderItems)
            {
                await DeleteProductFromBasket(userId, advert.AdvertId);
            }

            await _basket.SaveAsync();
        }

        public async Task pushBasketByIds(string userId, int[] ids)
        {
            var products = (await _advert.GetAsync()).ToArray();

            // Отримуємо всі товари в кошику для конкретного користувача
            var existingBasketItems = (await _basket.GetAsync())
                .Where(x => x.UserId == userId)
                .ToList();

            List<Advert> returnAdverts = new List<Advert>();

            // Для кожного ID продукту перевіряємо його наявність
            foreach (var productId in ids)
            {
                var product = products.FirstOrDefault(p => p.Id == productId);
                if (product != null)
                {
                    returnAdverts.Add(product);
                }
            }

            foreach (var advert in returnAdverts)
            {
                // Перевіряємо, чи вже є цей товар у кошику
                var existingItem = existingBasketItems.FirstOrDefault(b => b.AdvertId == advert.Id);
                var imagePath = await _imageRepo.AsQueryable()
                .Where(x => x.AdvertId == advert.Id)
                .Select(x => x.Name)
                .FirstOrDefaultAsync() ?? "default-image.jpg";

                if (existingItem == null)
                {
                    // Додаємо новий товар у кошик з початковою кількістю 1
                    await _basket.InsertAsync(new Basket
                    {
                        AdvertId = advert.Id,
                        UserId = userId,
                        DateAdded = DateTime.UtcNow,
                        Count = 1,
                        ImagePath = imagePath
                    });
                }
                else
                {
                    var item = await _basket.GetItemBySpec(new BasketSpecs.GetById(existingItem.Id));
                    item.Count += 1; // Збільшуємо кількість на 1 (замініть, якщо потрібно інше значення)
                    _basket.Update(item);
                }
            }

            await _basket.SaveAsync();
        }

        public async Task ClearBasket(string userId)
        {
            var items = await GetBasketItems(userId);
            if(items == null)
            {
                return;
            }
            else
            {
                foreach (var item in items)
                {   
                    await DeleteProductFromBasket(userId, item.Id);
                }
            }
        }
    }
}
