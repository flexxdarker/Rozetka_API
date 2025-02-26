using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.CategoryModels;
using BusinessLogic.Specifications;
using DataAccess.Repostories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Rozetka_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertRatingController : ControllerBase
    {
        private readonly IAdvertRatingService advertRatingService;

        public AdvertRatingController(IAdvertRatingService advertRatingService)
        {
           this.advertRatingService = advertRatingService;
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllAdverts()
        {
            return Ok(await advertRatingService.GetAllAsync());
        }

        [AllowAnonymous]
        [HttpGet("getbyid/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            return Ok(await advertRatingService.GetByIdAsync(id));
        }

        [Authorize]
        [HttpPut("create")]
        public async Task<IActionResult> Create([FromForm] AdvertRatingCreateModel advertCreationModel)
        {
            var userId = User.FindFirst("Id")?.Value;
            return Ok(await advertRatingService.CreateAsync(advertCreationModel, userId));
        }

        [AllowAnonymous]
        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            await advertRatingService.DeleteAsync(id);
            return Ok();
        }
    }
}
