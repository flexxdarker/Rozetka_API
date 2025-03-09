using BusinessLogic.Interfaces;
using BusinessLogic.Models.AdvertModels;
using BusinessLogic.Models.FilterModels;
using BusinessLogic.Models.FilterValueModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Rozetka_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterValueController : ControllerBase
    {
        private readonly IFilterValueService filterValueService;

        public FilterValueController(IFilterValueService filterValueService)
        {
            this.filterValueService = filterValueService;
        }

        [AllowAnonymous]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllAdverts()
        {
            return Ok(await filterValueService.GetAllAsync());
        }

        [AllowAnonymous]
        [HttpGet("getbyid/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            return Ok(await filterValueService.GetByIdAsync(id));
        }

        [AllowAnonymous]
        [HttpPut("create")]
        public async Task<IActionResult> Create([FromForm] FilterValueCreationModel createModel)
        {
            return Ok(await filterValueService.CreateAsync(createModel));
        }

        //[AllowAnonymous]
        //[HttpPost("edit")]
        //public async Task<IActionResult> Edit([FromForm] FilterValueEditModel editModel)
        //{
        //    return Ok(await filterValueService.EditAsync(editModel));
        //}

        [AllowAnonymous]
        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await filterValueService.DeleteAsync(id);
            return Ok();
        }
    }
}
