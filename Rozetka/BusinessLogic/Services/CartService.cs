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

        public void Add(CreateBasketModel cartModel)
        {
            //cartR.Insert(mapper.Map<Cart>(cartModel));
            
            //cartR.Insert()
        }

        public void Add(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AdvertDto>> GetAdverts()
        {
            return (Task<IEnumerable<AdvertDto>>)cartR.GetAll();
        }

        public int GetCount()
        {
            var items = cartR.GetAll();
            return items.Count();
        }

        public IEnumerable<int> GetProductIds()
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            cartR.Delete(id);
        }
    }
}
