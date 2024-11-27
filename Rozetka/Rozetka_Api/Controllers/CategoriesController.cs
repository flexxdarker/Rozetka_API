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
        [HttpGet("getcategories")]
        public async Task<IActionResult> GetAllCountries()
        {
            return Ok(await categoriesService.GetAllAsync());
        }

        [AllowAnonymous]
        [HttpGet("getbyid/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            return Ok(await categoriesService.GetByIdAsync(id));
        }

    }
}
