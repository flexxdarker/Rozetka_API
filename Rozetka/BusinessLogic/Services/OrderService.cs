using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DTOs.Cart;
using BusinessLogic.DTOs.Order;
using BusinessLogic.DTOs.OrderStatus;
using BusinessLogic.DTOs.User;
using BusinessLogic.Enities;
using BusinessLogic.Interfaces;
using BusinessLogic.Specifications;
using DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Order> _order;
        private readonly IRepository<OrderStatus> _orderStatus;

        public OrderService(IMapper mapper, IRepository<Order> order,  IRepository<OrderStatus> orderStatus)
        {
            this.mapper = mapper;
            this._order = order;
            this._orderStatus = orderStatus;
        }

        public async Task ChangeStatus(int Id, int statusId)
        {
            var order = await _order.AsQueryable().Where(x => x.Id == Id).FirstOrDefaultAsync();

            var status = _orderStatus.AsQueryable().Where(x => x.Id == statusId).FirstOrDefault();

            if (order != null)
            {
                order.OrderStatusId = status.Id;


                _order.Update(order);
                await _order.SaveAsync();
                await _orderStatus.SaveAsync();
            }
        }

        public Task<List<ChangeOrderStatus>> GetAllOrders()
        {
            var orders = _order.AsQueryable()
                            .Include(o => o.User) // включаємо користувача, що створив замовлення
                            .Include(o => o.OrderStatus) // включаємо статус замовлення
                            .Include(o => o.OrderAdverts) // включаємо продукти замовлення
                            .ThenInclude(op => op.Advert) // включаємо сам продукт
            .ThenInclude(p => p.Images) // включаємо зображення продукту
        .Select(o => new ChangeOrderStatus
        {
            Id = o.Id,
            Names = o.OrderAdverts.Select(oa => oa.Advert.Title).ToList(),
            UserName = o.User.UserName,
            PhoneNumber = o.User.PhoneNumber,
            Status = o.OrderStatus.Status, // назва статусу
            TotalPrice = o.Amount, // загальна сума
            DateCrated = o.DateCrated.ToString("yyyy-MM-dd HH:mm:ss"),
            ImagePaths = o.OrderAdverts
                .SelectMany(op => op.Advert.Images)
                .Select(img => img.Name)
                .ToList(),
            ImageUser = o.User.Avatar.Name
        }).ToListAsync();

            return orders;
        }

        public async Task<List<OrderStatus>> GetAllStatus()
        {
            var status = await _orderStatus.AsQueryable().ToListAsync();

            return status;
        }

        public async Task<PagedResult<OrderInformationDto>> GetInfarmationAboutOrder(string userId, int page, int pageSize)
        {
            var orderItems = _order.AsQueryable().Where(x => x.UserId == userId)
                .Select(x => new OrderInformationDto
                {
                    Id = x.Id,
                    Status = x.OrderStatus.Status,
                    Names = x.OrderAdverts.Select(x=>x.Advert.Title).ToList(),
                    TotalPrice = x.Amount,
                    ImagePaths = x.OrderAdverts
                    .SelectMany(x=>x.Advert.Images
                    .Select(img=>img.Name)).ToList(),
                });
            var totalOrders = orderItems.Count();
            
            var items = orderItems
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<OrderInformationDto>
            {
                Items = items,
                TotalCount = totalOrders,
                PageSize = pageSize,
                CurrentPage = page
            };
        }

        public async Task<PagedResult<BasketViewItem>> GetOrderById(int id, int pageNumber, int pageSize)
        {
            var orders = _order.AsQueryable()
                               .Where(x => x.Id == id)
                               .Include(x => x.OrderAdverts)
                               .ThenInclude(op => op.Advert)
                               .ThenInclude(im=>im.Images)// Приєднуємо продукти до OrderProducts
                    .SelectMany(order => order.OrderAdverts.Select(op => new BasketViewItem
                    {
                        Id = op.Advert.Id,
                        Name = op.Advert.Title,
                        Description = op.Advert.Description,
                        Price = op.Price,
                        Category = op.Advert.Category.Name,
                        Amount = op.Count,
                        ImagePaths = op.Advert.Images.Select(pi => pi.Name).ToList() // Припускаємо, що ProductImage має поле ImagePath
                    }));


            // Загальна кількість користувачів
            var totalOrders = await orders.CountAsync();

            // Повернення користувачів для конкретної сторінки
            var items = await orders
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<BasketViewItem>
            {
                Items = items,
                TotalCount = totalOrders,
                PageSize = pageSize,
                CurrentPage = pageNumber
            };
        }

        public async Task<ChangeOrderStatus> ResiveOrderById(int id)
        {
            var order = await _order.AsQueryable()
                            .Where(x => x.Id == id)
                            .Include(o => o.User) // включаємо користувача, що створив замовлення
                            .Include(o => o.OrderStatus) // включаємо статус замовлення
                            .Include(o => o.OrderAdverts) // включаємо продукти замовлення
                            .ThenInclude(op => op.Advert) // включаємо сам продукт
            .ThenInclude(p => p.Images) // включаємо зображення продукту
        .Select(o => new ChangeOrderStatus
        {
            Id = o.Id,
            Names = o.OrderAdverts.Select(oa => oa.Advert.Title).ToList(),
            UserName = o.User.UserName,
            PhoneNumber = o.User.PhoneNumber,
            Status = o.OrderStatus.Status, // назва статусу
            TotalPrice = o.Amount, // загальна сума
            DateCrated = o.DateCrated.ToString("yyyy-MM-dd HH:mm:ss"),
            ImagePaths = o.OrderAdverts
                .SelectMany(op => op.Advert.Images)
                .Select(img => img.Name)
                .ToList(),
            ImageUser = o.User.Avatar.Name
        }).FirstOrDefaultAsync();

            return order;
        }
    }
}
