using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.Enities;
using BusinessLogic.Interfaces;
using DataAccess.Repostories;

namespace BusinessLogic.Services
{
    public class CartService : ICartService
    {
        private readonly IMapper mapper;
        private readonly IRepository<Order> orderR;
        private readonly IRepository<Cart> cartR;

        public CartService(IMapper mapper, IRepository<Order> orderR, IRepository<Cart> cartR)
        {
            this.mapper = mapper;
            this.orderR = orderR;
            this.cartR = cartR;
        }

        public void Add(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AdvertDto>> GetAdverts()
        {
            throw new NotImplementedException();
        }

        public int GetCount()
        {
            throw new NotImplementedException();
        }

        //public IEnumerable<int> GetProductIds()
        //{
        //     //cartR.GetListBySpec()
        //}

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }
    }
}
