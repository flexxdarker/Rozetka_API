using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Models;
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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService categoriesService;

        public CategoriesController(ICategoryService categoriesService)
        {
           this.categoriesService = categoriesService;
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(await categoriesService.GetAllAsync());
        }

        [AllowAnonymous]
        [HttpGet("gettree")]
        public async Task<IActionResult> GetTree()
        {
            return Ok(await categoriesService.GetTreeAsync());
        }

        [AllowAnonymous]
        [HttpGet("getbyid/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            return Ok(await categoriesService.GetByIdAsync(id));
        }

        [AllowAnonymous]
        [HttpPut("create")]
        public async Task<IActionResult> Create([FromForm] CategoryCreationModel categoryCreationModel)
        {
            return Ok(await categoriesService.CreateAsync(categoryCreationModel));
        }

        [AllowAnonymous]
        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await categoriesService.DeleteAsync(id);
            return Ok();
        }
    }
}
