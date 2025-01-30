using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Models.AdvertModels;
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
    public class AdvertController : ControllerBase
    {
        private readonly IAdvertService advertService;

        public AdvertController(IAdvertService advertService)
        {
           this.advertService = advertService;
        }


        [AllowAnonymous]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllAdverts()
        {
            return Ok(await advertService.GetAllAsync());
        }

        [AllowAnonymous]
        [HttpGet("getbyid/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            return Ok(await advertService.GetByIdAsync(id));
        }

        [AllowAnonymous]
        [HttpPut("create")]
        public async Task<IActionResult> Create([FromForm] AdvertCreationModel advertCreationModel)
        {
            return Ok(await advertService.CreateAsync(advertCreationModel));
        }
    }
}
