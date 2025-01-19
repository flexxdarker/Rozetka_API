using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Cart;
using BusinessLogic.DTOs.Order;

namespace BusinessLogic.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllByUser(string userId);
        //Task Create(CreateBasketModel cartModel);
    }
}
