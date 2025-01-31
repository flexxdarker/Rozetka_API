using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Specifications;
using DataAccess.Repostories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusinessLogic.DTOs.Models.CategoryModels;
using BusinessLogic.DTOs.Models;

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
    }
}
