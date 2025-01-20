using BusinessLogic.DTOs.Order;
using BusinessLogic.Enities;
using BusinessLogic.Entities;
using DataAccess.Repostories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class BasketService
    {
        private readonly IRepository<Basket> _basket;
        private readonly IRepository<Advert> _advert;
        private readonly IRepository<OrderStatus> _status;
        private readonly RozetkaDbContext _context;

        public BasketService(IRepository<OrderStatus> status, IRepository<Basket> basket, IRepository<Advert> advert, RozetkaDbContext context)
        {
            _basket = basket;
            _advert = advert;
            _context = context;
            _status = status;
        }

        public async Task pushBasketById(string idUser, int productId)
        {

            var advert = await _advert.GetByIDAsync(productId);

            var searh = await _basket.GetAsync();

            var existingBasketItem = searh.FirstOrDefault(b => b.AdvertId == advert.Id && b.UserId == idUser);

            if (existingBasketItem == null)
            {
                // Якщо товар не знайдено в кошику, додаємо новий
                await _basket.InsertAsync(new Basket
                {
                    AdvertId = advert.Id,
                    UserId = idUser,
                    DateAdded = DateTime.UtcNow
                });

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
            }

            await _basket.SaveAsync();
        }

        public async Task<List<BasketViewItem>> GetBasketItems(string userId, int[] array)
        {
            List<BasketViewItem> items = await _context.Basket
            .Where(x => x.UserId == userId && array.Contains(x.ProductId))
            .Select(x => new BasketViewItem
            {
                Id = x.Product.Id,
                Name = x.Product.Name,
                Description = x.Product.Description,
                Price = x.Product.Price,
                Color = x.Product.Color,
                Brand = x.Product.Brand.Name,
                Category = x.Product.Category.Name,
                Amount = 1,
                ImagePaths = x.Product.ProductImages.Select(pi => pi.ImagePath).ToList()
            }).ToListAsync();

            return items;
        }
        public async Task<List<BasketViewItem>> GetBasketItemsLogout(int[] array)
        {
            if (array == null || array.Length == 0)
            {
                return new List<BasketViewItem>();
            }

            List<BasketViewItem> items = await _context.Products
                .Where(x => array.Contains(x.Id))
                .Select(x => new BasketViewItem
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Price = x.Price,
                    Color = x.Color,
                    Brand = x.Brand.Name,
                    Category = x.Category.Name,
                    Amount = 1,
                    ImagePaths = x.ProductImages.Select(pi => pi.ImagePath).ToList()
                }).ToListAsync();

            return items;
        }

        public async Task<List<int>> DeleteProductWithBascet(string userId, int advertId)
        {
            var basketItem = await _context.Basket.FirstOrDefaultAsync(x => x.UserId == userId && x.AdvertId == advertId);

            if (basketItem != null)
            {
                _context.Basket.Remove(basketItem);

                await _context.SaveChangesAsync();
            }

            List<int> array = await _context.Basket.Where(x => x.UserId == userId).Select(x => x.ProductId).ToListAsync();

            return array;
        }

        public async Task PushOrderWhenLogin(string userId, List<OrderItemDto> orderItems)
        {

            var status = await _context.OrderStatus.Where(x => x.Name == "Booked").FirstOrDefaultAsync();

            var amount = orderItems.FirstOrDefault().Amount;

            var order = new Order
            {
                UserId = userId,
                OrderStatusId = status.Id,
                DateCrated = DateTime.UtcNow,
                Amount = amount
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();


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

            _context.OrderProducts.AddRange(listProduct);

            await _context.SaveChangesAsync();

            foreach (var item in orderItems)
            {
                await DeleteProductWithBascet(userId, item.ProductId);
            }

            await _context.SaveChangesAsync();
        }
    }
}
