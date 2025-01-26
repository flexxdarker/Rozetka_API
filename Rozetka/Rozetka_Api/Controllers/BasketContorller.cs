using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Models;
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
    public class ProductRequest
    {
        public int ProductId { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketService _basket;

        public BasketController(IBasketService basket)
        {
            _basket = basket;
        }

        //[Authorize]
        [HttpPost("CreateBasketId")]
        public async Task<IActionResult> CreateBasketId([FromBody] ProductRequest request)
        {
            string userId = User.Claims.ToList()[0].Value.ToString();

            await _basket.pushBasketById(userId, request.ProductId);

            return Ok();
        }

        [Authorize]
        [HttpPost("CreateBasketArray")]
        public async Task<IActionResult> CreateBasketArray([FromBody] int[] array)
        {
            string userId = User.Claims.ToList()[0].Value.ToString();

            await _basket.pushBasketArray(userId, array);

            return Ok();
        }

        [Authorize]
        [HttpPost("GetBasketItems")]
        public async Task<IActionResult> GetBasketItems([FromBody] int[] array)
        {
            string userId = User.Claims.ToList()[0].Value.ToString();

            var basket = await _basket.GetBasketItems(userId, array);

            return Ok(basket);
        }

        [HttpPost("GetBasketItemLogout")]
        public async Task<IActionResult> GetBasketItemsLogout([FromBody] int[] array)
        {
            var basket = await _basket.GetBasketItemsLogout(array);

            return Ok(basket);
        }

        [Authorize]
        [HttpDelete("DeleteBasket/{productId}")]
        public async Task<IActionResult> DeleteProductWithBaset([FromRoute] int productId)
        {
            string userId = User.Claims.ToList()[0].Value.ToString();

            var array = _basket.DeleteProductWithBascet(userId, productId);

            return Ok(array);
        }

        [HttpPost("PushOrderWhenLogin")]
        public async Task<IActionResult> PushOrderWhenLogin([FromBody] List<OrderItemDto> orderItems)
        {
            string userId = User.Claims.ToList()[0].Value.ToString();

            await _basket.PushOrderWhenLogin(userId, orderItems);

            return Ok();
        }
    }

}