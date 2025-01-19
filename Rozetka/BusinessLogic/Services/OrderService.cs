using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DTOs.Cart;
using BusinessLogic.DTOs.Order;
using BusinessLogic.Enities;
using BusinessLogic.Interfaces;
using DataAccess.Repostories;

namespace BusinessLogic.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Order> orderR;

        public Task Create(OrderDto cartModel)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderDto>> GetAllByUser(string userId)
        {
            throw new NotImplementedException();
            //return orderR.GetByID(userId);
        }
    }
}
