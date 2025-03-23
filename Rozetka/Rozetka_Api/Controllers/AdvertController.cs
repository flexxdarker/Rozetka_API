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
        [HttpGet("getall/{catgoryId:int}")]
        public async Task<IActionResult> GetAllByCategiryId([FromRoute] int catgoryId)
        {
            return Ok(await advertService.GetAllAsync(catgoryId));
        }


        [AllowAnonymous]
        [HttpGet("getbyid/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            return Ok(await advertService.GetByIdAsync(id));
        }

        [Authorize(Roles = "admin")]
        [HttpPut("create")]
        public async Task<IActionResult> Create([FromForm] AdvertCreateModel advertCreationModel)
        {
            return Ok(await advertService.CreateAsync(advertCreationModel));
        }

        [Authorize(Roles = "admin")]
        [HttpPost("edit")]
        public async Task<IActionResult> Edit([FromForm] AdvertEditModel advertEditModel)
        {
            return Ok(await advertService.EditAsync(advertEditModel));
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            await advertService.DeleteAsync(id);
            return Ok();
        }
    }
}
