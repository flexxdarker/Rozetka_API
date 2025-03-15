using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Order;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Specifications;
using DataAccess.Repostories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Rozetka_Api.Controllers
{ 

    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderservice;

        public OrderController(IOrderService order)
        {
            _orderservice = order;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("OrderInfo")]
        public async Task<IActionResult> GetAllOrders([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 2)
        {
            string userId = User.Claims.ToList()[0].Value.ToString();

            var orders = await _orderservice.GetInfarmationAboutOrder(userId, pageNumber, pageSize);
         
            return Ok(orders);
        }

        [Authorize]
        [HttpGet("OrderById")]
        public async Task<IActionResult> OrderById([FromQuery] int id, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 4)
        {
            string userId = User.Claims.ToList()[0].Value.ToString();

            return Ok(await _orderservice.GetOrderById(id, pageNumber, pageSize));
        }

        [Authorize]
        [HttpGet("GetAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderservice.GetAllOrders();

            return Ok(orders);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("ReciveOrderById/{id}")]
        public async Task<IActionResult> ReciveOrderById(int id)
        {
            var order = await _orderservice.ResiveOrderById(id);

            return Ok(order);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("GetAllStatuses")]
        public async Task<IActionResult> GetAllStatuses()
        {
            return Ok(await _orderservice.GetAllStatus());
        }

        [Authorize(Roles = "admin")]
        [HttpPut("ChangeStatus")]
        public async Task<IActionResult> ChangeStatus(int orderId,int statusId)
        {
            await _orderservice.ChangeStatus(orderId, statusId);

            return Ok();
        }
    }

}