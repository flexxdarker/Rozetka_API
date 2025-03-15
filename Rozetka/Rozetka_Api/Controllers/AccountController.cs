using BusinessLogic.DTOs;
using BusinessLogic.DTOs.User;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models.UserModels;
using BusinessLogic.Services;
using DataAccess.Repositories;
using DataAccess.Repostories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rozetka_Api.Helpers;

namespace Rozetka_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountsService accountsService;
        private readonly IRepository<User> userRepo;
        private readonly UserManager<User> userManager;
        private readonly IJwtService jwtService;
        private readonly IRepository<Avatar> avatarRepository;

        public AccountsController(IAccountsService accountsService, IRepository<User> userRepo, UserManager<User> userManager, IJwtService jwtService, IRepository<Avatar> avatarRepository)
        {
            this.accountsService = accountsService;
            this.userRepo = userRepo;
            this.userManager = userManager;
            this.jwtService = jwtService;
            this.avatarRepository = avatarRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterModel model)
        {
            await accountsService.Register(model);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] LoginModel model)
        {
            return Ok(await accountsService.Login(model));
        }

        //[Authorize]
        //[HttpPost("refreshTokens")]
        //public async Task<IActionResult> RefreshTokens(UserTokens tokens)
        //{
        //    return Ok(await accountsService.RefreshTokens(tokens));
        //}

        [HttpPost("GoogleSignIn")]
        public async Task<IActionResult> GoogleSignIn([FromForm] GoogleLoginDto model)
        {

            var result = await accountsService.GoogleSignInAsync(model);
            return Ok(result);
        }

        [Authorize]
        [HttpPut("edit-user")]
        public async Task<IActionResult> EditUser([FromForm] UserEditDto editUserDto)
        {
            string userId = User.Claims.ToList()[0].Value.ToString();

            await accountsService.EditUserAsync(editUserDto, userId);

            var user = userRepo.AsQueryable()
                .FirstOrDefault(x => x.Id == userId);

            var roles = await userManager.GetRolesAsync(user);

            var avatar = avatarRepository.AsQueryable()
                .FirstOrDefault(x => x.UserId == userId)?.Name;

            var userTokenInfo = new UserTokenInfo
            {
                Id = user.Id,
                Name = user.Name,
                SurName = user.SurName,
                Email = user.Email,
                Birthday = user.Birthdate.ToString("dd-MM-yyyy"),
                AvatarPath = avatar,
                PhoneNumber = user.PhoneNumber,
                Roles = roles.ToList(),
            };

            var token = await jwtService.CreateToken(userTokenInfo);

            return Ok(new { token });
        }

        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromForm] ChangePasswordDto model)
        {
            string userId = User.Claims.ToList()[0].Value.ToString();


            var result = accountsService.ChangePasswordAsync(model, userId);

            if (result.Result.Succeeded)
            {
                return Ok(new { message = "Password Changed successfully" });
            }
            else
            {
                return BadRequest(new { message = "Password didn`t changed", result });
            }

        }

        [Authorize(Roles = "admin")]
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            // Отримання користувачів із пагінацією через сервіс
            var result = await accountsService.GetAllUsers();

            // Повернення результату з даними та інформацією про пагінацію
            return Ok(result);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("BlockUser")]
        public async Task<IActionResult> BlockUser([FromBody] BlockUserDto model)
        {
            return Ok(await accountsService.BlockUser(model.UserId));
        }

        [Authorize(Roles = "admin")]
        [HttpGet("UserById")]
        public async Task<IActionResult> GetUser()
        {
            string id = User.Claims.ToList()[0].Value.ToString();

            var user = await accountsService.GetUser(id);

            return Ok(user);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("UnBlockUser")]
        public async Task<IActionResult> UnBlockUser([FromBody] BlockUserDto model)
        {
            return Ok(await accountsService.UnblockUser(model.UserId));
        }
    }
}
