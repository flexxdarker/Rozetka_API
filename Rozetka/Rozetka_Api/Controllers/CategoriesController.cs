using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Filter;
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
        private readonly IFilterService filtersService;
        private readonly IMapper mapper;
        private readonly IRepository<Filter> filterRepo;

        public CategoriesController(ICategoryService categoriesService)
        {
           this.categoriesService = categoriesService;
        }


        [AllowAnonymous]
        [HttpGet("getallcategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(await categoriesService.GetAllAsync());
        }

        [AllowAnonymous]
        [HttpGet("getparentcategories")]
        public async Task<IActionResult> GetParentCategories()
        {
            return Ok(await categoriesService.GetParentAsync());
        }

        [AllowAnonymous]
        [HttpGet("getsubcategoriesof/{parentId:int}")]
        public async Task<IActionResult> GetSubCategories([FromRoute] int parentId)
        {
            return Ok(await categoriesService.GetSubAsync(parentId));
        }

        [AllowAnonymous]
        [HttpGet("getbyid/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            return Ok(await categoriesService.GetByIdAsync(id));
        }

        [HttpPut("create")]
        public async Task<IActionResult> Create([FromForm] CategoryCreationModel categoryCreationModel)
        {
            return Ok(await categoriesService.CreateAsync(categoryCreationModel));
        }


        [AllowAnonymous]
        [HttpGet("getfilters")]
        public async Task<IActionResult> GetFilters([FromRoute] int categoryId)
        {
            var filters = await filterRepo.GetListBySpec(new FilterSpecs.GetAll());
            if (filters == null)
                return NotFound("Filters not found.");
            return Ok(mapper.Map<IEnumerable<FilterDto>>(filters));

            //return Ok(await filtersService.GetByCategoryIdAsync(categoryId));
        }
    }
}
