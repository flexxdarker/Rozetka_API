﻿using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Filter;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
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
        [HttpGet("getcategories")]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(await categoriesService.GetParentAsync());
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

        [Authorize(Roles = "admin")]
        [HttpPut("create")]
        public async Task<IActionResult> Create([FromForm] CategoryCreateModel categoryCreateModel)
        {
            return Ok(await categoriesService.CreateAsync(categoryCreateModel));
        }

        [Authorize(Roles = "admin")]
        [HttpPost("edit")]
        public async Task<IActionResult> Edit([FromForm] CategoryEditModel categorEditModel)
        {
            return Ok(await categoriesService.EditAsync(categorEditModel));
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await categoriesService.DeleteAsync(id);
            return Ok();
        }
    }
}
