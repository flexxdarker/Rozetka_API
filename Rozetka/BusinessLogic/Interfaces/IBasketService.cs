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
        Task pushBasketById(int id, int user);
        Task pushBasketArray(int userId, int[] productIds);
        Task<List<BasketViewItem>> GetBasketItems(int userId, int[] array);
        Task<List<BasketViewItem>> GetBasketItemsLogout(int[] array);
        Task<List<int>> DeleteProductWithBascet(int userId, int productId);
        Task PushOrderWhenLogin(int userId, List<OrderItemDto> orderItems);
    }
}
