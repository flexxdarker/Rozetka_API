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

        public AccountsController(IAccountsService accountsService, IRepository<User> userRepo, UserManager<User> userManager, IJwtService jwtService)
        {
            this.accountsService = accountsService;
            this.userRepo = userRepo;
            this.userManager = userManager;
            this.jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            await accountsService.Register(model);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] LoginModel model)
        {
            return Ok(await accountsService.Login(model));
        }

        [HttpPost("refreshTokens")]
        public async Task<IActionResult> RefreshTokens(UserTokens tokens)
        {
            return Ok(await accountsService.RefreshTokens(tokens));
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout(LogoutModel model)
        {
            await accountsService.Logout(model.RefreshToken);
            return Ok();
        }
        [HttpPost("GoogleSignIn")]
        public async Task<IActionResult> GoogleSignIn([FromBody] GoogleLoginDto model)
        {

            var result = await accountsService.GoogleSignInAsync(model);

            if (result.IsSuccess)
            {

                if (result.Baskets != null)
                {
                    return Ok(new { token = result.AccessToken, refreshToken = result.RefreshToken , baskets = result.Baskets });
                }
                else
                {
                    return Ok(new { token = result.AccessToken, refreshToken = result.RefreshToken });
                }

            }
            else
            {
                return BadRequest(result);
            }
        }
        [HttpPut("edit-user")]
        public async Task<IActionResult> EditUser([FromForm] UserEditDto editUserDto)
        {
            await accountsService.EditUserAsync(editUserDto);

            string userId = User.Claims.ToList()[0].Value.ToString();

            var user = userRepo.AsQueryable()
                .FirstOrDefault(x => x.Id == userId);


            var token = jwtService.CreateToken(jwtService.GetClaims(user));

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

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            // Отримання користувачів із пагінацією через сервіс
            var result = await accountsService.GetAllUsers(pageNumber, pageSize);

            // Повернення результату з даними та інформацією про пагінацію
            return Ok(result);
        }

        [HttpPost("BlockUser")]
        public async Task<IActionResult> BlockUser([FromBody] BlockUserDto model)
        {
            return Ok(await accountsService.BlockUser(model.UserId));
        }

        [Authorize]
        [HttpGet("UserById")]
        public async Task<IActionResult> GetUser()
        {
            string id = User.Claims.ToList()[0].Value.ToString();

            var user = await accountsService.GetUser(id);

            return Ok(user);
        }

        [HttpPost("UnBlockUser")]
        public async Task<IActionResult> UnBlockUser([FromBody] BlockUserDto model)
        {
            return Ok(await accountsService.UnblockUser(model.UserId));
        }
    }
}
