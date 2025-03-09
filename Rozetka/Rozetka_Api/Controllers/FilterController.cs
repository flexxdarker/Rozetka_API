using BusinessLogic.Interfaces;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.FilterModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Rozetka_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly IFilterService filterService;

        public FilterController(IFilterService filterService)
        {
            this.filterService = filterService;
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllAdverts()
        {
            return Ok(await filterService.GetAllAsync());
        }

        [AllowAnonymous]
        [HttpGet("getbyid/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            return Ok(await filterService.GetByIdAsync(id));
        }

        [AllowAnonymous]
        [HttpPut("create")]
        public async Task<IActionResult> Create([FromForm] FilterCreateModel filterCreateModel)
        {
            return Ok(await filterService.CreateAsync(filterCreateModel));
        }

        [AllowAnonymous]
        [HttpPost("edit")]
        public async Task<IActionResult> Edit([FromForm] FilterEditModel filterEditModel)
        {
            return Ok(await filterService.EditAsync(filterEditModel));
        }

        [AllowAnonymous]
        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await filterService.DeleteAsync(id);
            return Ok();
        }
    }
}
