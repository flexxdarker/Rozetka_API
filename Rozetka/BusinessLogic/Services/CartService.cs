using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Cart;
using BusinessLogic.DTOs.Order;
using BusinessLogic.Enities;
using BusinessLogic.Interfaces;
using DataAccess.Repostories;

namespace BusinessLogic.Services
{
    public class CartService : IBasketService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Basket> cartR;

        public CartService(IMapper mapper, IRepository<Basket> cartR)
        {
            this.mapper = mapper;
            this.cartR = cartR;
        }

        public void Add(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<int>> DeleteProductWithBascet(int userId, int productId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AdvertDto>> GetAdverts()
        {
            throw new NotImplementedException();
            //return (Task<IEnumerable<AdvertDto>>)cartR.GetAll();
        }

        public Task<List<BasketViewItem>> GetBasketItems(int userId, int[] array)
        {
            throw new NotImplementedException();
        }

        public Task<List<BasketViewItem>> GetBasketItemsLogout(int[] array)
        {
            throw new NotImplementedException();
        }

        public int GetCount()
        {
            //var items = cartR.GetAll();
            //return items.Count();
            throw new NotImplementedException();
        }

        public IEnumerable<int> GetProductIds()
        {
            throw new NotImplementedException();
        }

        public Task pushBasketArray(int userId, int[] productIds)
        {
            throw new NotImplementedException();
        }

        public Task pushBasketById(int id, int user)
        {
            throw new NotImplementedException();
        }

        public Task PushOrderWhenLogin(int userId) //List<OrderItemDto> orderItems)
        {
            throw new NotImplementedException();
        }

        public Task PushOrderWhenLogin(int userId, List<OrderItemDto> orderItems)
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            cartR.Delete(id);
        }
    }
}
