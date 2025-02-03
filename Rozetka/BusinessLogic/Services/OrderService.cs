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
using DataAccess.Repostories;

namespace BusinessLogic.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Order> _order;
        private readonly IRepository<OrderService> _orderService;

        public Task ChangeStatus(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<List<ChangeOrderStatus>> GetAllOrders()
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderStatus>> GetAllStatus()
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<OrderInformationDto>> GetInfarmationAboutOrder(string userId, int page, int pageSize)
        {
            var orders = await _order.GetListBySpec(new OrderSpecs.GetAll());
            var orderItems = orders.Where(x => x.UserId == userId)
                .Select(x => new OrderInformationDto
                {
                    Id = x.Id,
                    //Status = x.OrderStatus.isCompleted
                            //? "Completed" : "In Progress",
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

        public Task<PagedResult<BasketViewItem>> GetOrderById(int id, int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<ChangeOrderStatus> ResiveOrderById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
