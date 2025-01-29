using AutoMapper;
using BusinessLogic.DTOs.Models;
using BusinessLogic.DTOs;
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
    public class SubCategoriesController : ControllerBase
    {
        private readonly ICategoryService categoriesService;

        public SubCategoriesController(ICategoryService categoriesService)
        {
            this.categoriesService = categoriesService;
        }

        [AllowAnonymous]
        [HttpGet("getparents")]
        public async Task<IActionResult> GetParentCategories()
        {
            return Ok(await categoriesService.GetParentAsync());
        }

        [AllowAnonymous]
        [HttpGet("getsub/{parentId:int}")]
        public async Task<IActionResult> GetSubCategories([FromRoute] int parentId)
        {
            return Ok(await categoriesService.GetSubAsync(parentId));
        }

        [AllowAnonymous]
        [HttpGet("getbyid/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            return Ok(await categoriesService.GetByIdWithSubAsync(id));
        }

        [HttpPut("create")]
        public async Task<IActionResult> Create([FromForm] CategoryCreationModel categoryCreationModel)
        {
            return Ok(await categoriesService.CreateAsync(categoryCreationModel));
        }
    }
}
