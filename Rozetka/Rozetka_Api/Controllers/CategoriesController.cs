using BusinessLogic.Interfaces;
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

    }
}
