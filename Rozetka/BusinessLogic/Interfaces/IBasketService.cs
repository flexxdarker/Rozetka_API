using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Basket;
using BusinessLogic.DTOs.Order;

namespace BusinessLogic.Interfaces
{
    public interface IBasketService
    {
        Task pushBasketById(string id, int user, int amount);
        Task pushBasketArray(string userId, AddAdvertDto addAdvert);
        Task pushBasketByIds(string userId, int[] ids);
        Task<List<BasketViewItem>> GetBasketItems(string userId/*, int[] array*/);
        Task DeleteProductFromBasket(string userId, int productId);
        Task<OrderInformationDto> PushOrder(string userId/*, List<OrderItemDto> orderItems*/);
        Task PushOrderWhenLogin(string userId, List<OrderItemDto> orderItems);
    }
}
