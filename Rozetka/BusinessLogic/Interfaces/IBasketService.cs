using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Order;

namespace BusinessLogic.Interfaces
{
    public interface IBasketService
    {
        Task pushBasketById(string id, int user);
        Task pushBasketArray(string userId, int[] productIds);
        Task<List<BasketViewItem>> GetBasketItems(string userId/*, int[] array*/);
        Task<List<BasketViewItem>> GetBasketItemsLogout();
        Task DeleteProductFromBasket(string userId, int productId);
        Task PushOrderWhenLogin(string userId/*, List<OrderItemDto> orderItems*/);
    }
}
