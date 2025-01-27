using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Advert;
using BusinessLogic.DTOs.Cart;
using BusinessLogic.DTOs.Order;
using BusinessLogic.DTOs.OrderStatus;
using BusinessLogic.DTOs.User;
using BusinessLogic.Enities;

namespace BusinessLogic.Interfaces
{
    public interface IOrderService
    {
        Task<PagedResult<OrderInformationDto>> GetInfarmationAboutOrder(string userId, int page, int pageSize);

        Task<PagedResult<BasketViewItem>> GetOrderById(int id, int pageNumber, int pageSize);

        Task<List<ChangeOrderStatus>> GetAllOrders();
        Task<ChangeOrderStatus> ResiveOrderById(int id);

        Task<List<OrderStatus>> GetAllStatus();
        Task ChangeStatus(int Id);
    }
}
