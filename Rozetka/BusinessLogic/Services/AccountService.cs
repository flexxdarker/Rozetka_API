using AutoMapper;
using BusinessLogic.DTOs.Basket;
using BusinessLogic.DTOs.User;
using BusinessLogic.Enities;
using BusinessLogic.Entities;
using BusinessLogic.Exceptions;
using BusinessLogic.Helpers;
using BusinessLogic.Interfaces;
using BusinessLogic.Models.UserModels;
using BusinessLogic.Specifications;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static Google.Apis.Auth.GoogleJsonWebSignature;
using static Google.Apis.Auth.JsonWebSignature;

namespace BusinessLogic.Services
{
    public class AccountsService : IAccountsService
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;
        private readonly IJwtService jwtService;
        private readonly IRepository<RefreshToken> refreshTokenR;
        private readonly IBasketService basketService;
        private readonly IRepository<Basket> basketRepo;
        private readonly IConfiguration _configuration;
        private readonly ISmtpService smtpService;
        private readonly IUnitOfWork UoW;
        private readonly IRepository<User> userRepo;

        public AccountsService(UserManager<User> userManager,
                                SignInManager<User> signInManager,
                                IMapper mapper,
                                IJwtService jwtService,
                                IRepository<RefreshToken> refreshTokenR,
                                IBasketService basketService,
                                IRepository<Basket> basketRepos,
                                IConfiguration configuration,
                                ISmtpService smtpService,
                                IUnitOfWork UoW,
                                IRepository<User> userRepo)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.jwtService = jwtService;
            this.refreshTokenR = refreshTokenR;
            this.basketService = basketService;
            this.basketRepo = basketRepos;
            this._configuration = configuration;
            this.smtpService = smtpService;
            this.UoW = UoW;
            this.userRepo = userRepo;
        }

        public async Task Register(RegisterModel model)
        {
            // TODO: validation

            // check user
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user != null)
                throw new HttpException("Email is already exists.", HttpStatusCode.BadRequest);

            // create user
            var newUser = mapper.Map<User>(model);
            var result = await userManager.CreateAsync(newUser, model.Password);

            if (!result.Succeeded)
                throw new HttpException(string.Join(" ", result.Errors.Select(x => x.Description)), HttpStatusCode.BadRequest);
        }

        public async Task<LoginResponseDto> Login(LoginModel model)
        {

            LoginResponseDto loginResponse = new LoginResponseDto();
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
                throw new HttpException("Invalid user login or password.", HttpStatusCode.BadRequest);

            //await signInManager.SignInAsync(user, true);

            // generate token
            loginResponse.AccessToken = jwtService.CreateToken(jwtService.GetClaims(user));
            loginResponse.RefreshToken = CreateRefreshToken(user.Id).Token;


            if (model.Baskets.Count > 0)
            {

                // Перетворюємо кошик у масив
                var basketArray = model.Baskets.ToArray();

                // Якщо користувач передав кошик із товарами
                if (basketArray.Length > 0)
                {
                    // Зберігаємо кошик користувача в базу даних
                    await  basketService.pushBasketByIds(user.Id, basketArray);

                    // Отримуємо поточний кошик користувача з бази
                    var array = await basketRepo.GetAsync();

                    // Вибираємо товари тільки для цього користувача
                    List<Basket> arrayUser = array.Where(x => x.UserId == user.Id).ToList();

                    // Створюємо список ID продуктів із кошика
                    List<int> newListIdBasket = arrayUser.Select(item => item.AdvertId).ToList();

                    // Передаємо список ID продуктів у відповідь
                    loginResponse.Baskets = newListIdBasket;
                }
                else
                {
                    loginResponse.Baskets = null; // Якщо кошик порожній
                }
            }
            else
            {

                // Отримуємо поточний кошик користувача з бази
                var array = await basketRepo.GetAsync();

                // Вибираємо товари тільки для цього користувача
                List<Basket> arrayUser = array.Where(x => x.UserId == user.Id).ToList();

                // Створюємо список ID продуктів із кошика
                List<int> newListIdBasket = arrayUser.Select(item => item.AdvertId).ToList();

                // Передаємо список ID продуктів у відповідь
                loginResponse.Baskets = newListIdBasket;
            }

            if (model.OrderItem.Count > 0)
            {

                await basketService.PushOrderWhenLogin(user.Id, model.OrderItem);
            }

            return loginResponse;
        }

        private RefreshToken CreateRefreshToken(string userId)
        {
            var refeshToken = jwtService.CreateRefreshToken();

            var refreshTokenEntity = new RefreshToken
            {
                Token = refeshToken,
                UserId = userId,
                CreationDate = DateTime.UtcNow // Now vs UtcNow
            };

            refreshTokenR.InsertAsync(refreshTokenEntity);
            refreshTokenR.SaveAsync();

            return refreshTokenEntity;
        }

        public async Task<UserTokens> RefreshTokens(UserTokens userTokens)
        {
            var refrestToken = await refreshTokenR.GetItemBySpec(new RefreshTokenSpecs.ByToken(userTokens.RefreshToken));

            if (refrestToken == null)
                throw new HttpException(Errors.InvalidToken, HttpStatusCode.BadRequest);

            var claims = jwtService.GetClaimsFromExpiredToken(userTokens.AccessToken);
            var newAccessToken = jwtService.CreateToken(claims);
            var newRefreshToken = jwtService.CreateRefreshToken();

            refrestToken.Token = newRefreshToken;

            // TODO: update creation time
            refreshTokenR.Update(refrestToken);
            await refreshTokenR.SaveAsync();

            var tokens = new UserTokens()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };

            return tokens;
        }

        public async Task Logout(string refreshToken)
        {
            //await signInManager.SignOutAsync();

            var refrestTokenEntity = await refreshTokenR.GetItemBySpec(new RefreshTokenSpecs.ByToken(refreshToken));

            if (refrestTokenEntity == null)
                throw new HttpException(Errors.InvalidToken, HttpStatusCode.BadRequest);

            refreshTokenR.Delete(refrestTokenEntity);
            await refreshTokenR.SaveAsync();
        }

        public async Task RemoveExpiredRefreshTokens()
        {
            var lastDate = jwtService.GetLastValidRefreshTokenDate();
            var expiredTokens = await refreshTokenR.GetListBySpec(new RefreshTokenSpecs.CreatedBy(lastDate));

            foreach (var i in expiredTokens)
            {
                refreshTokenR.Delete(i);
            }
            await refreshTokenR.SaveAsync();
        }

        private async Task<Google.Apis.Auth.GoogleJsonWebSignature.Payload> GetPayloadAsync(string credential)
        {
            throw new Exception();
            //return await ValidateAsync(
            //    credential,
            //    new ValidationSettings
            //    {
            //        Audience = [_configuration["Authentication:Google:ClientId"]]
            //    }
            //);
        }

        public async Task<LoginResponseDto> GoogleSignInAsync(GoogleLoginDto loginDto)
        {
            Google.Apis.Auth.GoogleJsonWebSignature.Payload payload = await GetPayloadAsync(loginDto.Credential);
            LoginResponseDto loginResponse = new LoginResponseDto();

            var user = userRepo.AsQueryable().FirstOrDefault(x => x.Email == payload.Email);

            user ??= await CreateGoogleUserAsync(payload);

            if(user.LockoutEnabled == true)
            {
                string lockoutDate = user.LockoutEnd.Value.ToString("MM/dd/yyyy");
                loginResponse.Error = $"User {user.Name} {user.SurName} locked to {lockoutDate}";
                loginResponse.AccessToken = "";
                loginResponse.Baskets = null;
                return loginResponse;
            }

            loginResponse.AccessToken = jwtService.CreateToken(jwtService.GetClaims(user));
            loginResponse.RefreshToken = CreateRefreshToken(user.Id).Token;

            if (loginDto.Baskets.Count > 0)
            {

                // Перетворюємо кошик у масив
                var basketArray = loginDto.Baskets.ToArray();

                // Якщо користувач передав кошик із товарами
                if (basketArray.Length > 0)
                {
                    // Зберігаємо кошик користувача в базу даних
                    await basketService.pushBasketByIds(user.Id, basketArray);

                    // Отримуємо поточний кошик користувача з бази
                    var array = await basketRepo.GetAsync();

                    // Вибираємо товари тільки для цього користувача
                    List<Basket> arrayUser = array.Where(x => x.UserId == user.Id).ToList();

                    // Створюємо список ID продуктів із кошика
                    List<int> newListIdBasket = arrayUser.Select(item => item.AdvertId).ToList();

                    // Передаємо список ID продуктів у відповідь
                    loginResponse.Baskets = newListIdBasket;
                }
                else
                {
                    loginResponse.Baskets = null; // Якщо кошик порожній
                }
            }
            else
            {

                // Отримуємо поточний кошик користувача з бази
                var array = await basketRepo.GetAsync();

                // Вибираємо товари тільки для цього користувача
                List<Basket> arrayUser = array.Where(x => x.UserId == user.Id).ToList();

                // Створюємо список ID продуктів із кошика
                List<int> newListIdBasket = arrayUser.Select(item => item.AdvertId).ToList();

                // Передаємо список ID продуктів у відповідь
                loginResponse.Baskets = newListIdBasket;
            }

            if (loginDto.OrderItems.Count > 0)
            {

                await basketService.PushOrderWhenLogin(user.Id, loginDto.OrderItems);
            }

            return loginResponse;

        }

        private async Task<User> CreateGoogleUserAsync(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {
            using var httpClient = new HttpClient();

            var user = new User
            {
                Name = payload.GivenName,
                SurName = payload.FamilyName,
                Email = payload.Email,
                UserName = payload.Email,

            };


            try
            {
                await CreateUserAsync(user);

                // Використовуйте властивості з об'єкта user замість dto
                smtpService.SuccessfulLogin(user.Name + " " + user.SurName, user.Email);

            }
            catch
            {

                throw;
            }

            return user;
        }
        public async Task CreateUserAsync(User user, string? password = null)
        {
            using var transaction = await UoW.BeginTransactionAsync();

            try
            {
                IdentityResult identityResult = await CreateUserInDatabaseAsync(user, password);
                if (!identityResult.Succeeded)
                    throw new IdentityException(identityResult, "User creating error");

                identityResult = await userManager.AddToRoleAsync(user, Roles.User);
                if (!identityResult.Succeeded)
                    throw new IdentityException(identityResult, "Role assignment error");

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        private async Task<IdentityResult> CreateUserInDatabaseAsync(User user, string? password)
        {
            if (password is null)
                return await userManager.CreateAsync(user);

            return await userManager.CreateAsync(user, password);
        }

        public async Task EditUserAsync(UserEditDto editUserDto)
        {
            string userId = editUserDto.Id;
            var user = await userManager.FindByIdAsync(userId);
            user.Name = editUserDto.FirstName;
            user.SurName = editUserDto.LastName;
            user.Email = editUserDto.Email;
            if (editUserDto.Image != null)
            {
                user.Image = editUserDto.Image;
            }

            if (!string.IsNullOrEmpty(editUserDto.Birthday))
            {
                DateTime localDateTime = DateTime.Parse(editUserDto.Birthday);
                DateTime utcDateTime = localDateTime.ToUniversalTime();
                user.Birthdate = utcDateTime;
            }

            await userManager.UpdateAsync(user);
        }

        public async Task<IdentityResult> ChangePasswordAsync(ChangePasswordDto model, string idUser)
        {
            var user = await userManager.FindByIdAsync(idUser);

            var result = await userManager.ChangePasswordAsync(user, model.currentPassword, model.newPassword);

            return result;
        }

        public async Task<User> GetUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            return user;
        }

        public async Task<IdentityResult> BlockUser(string userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());//.GetByIDAsync(userId);


            var result = await userManager.SetLockoutEnabledAsync(user, true);

            if (result.Succeeded)
            {
                result = await userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow.AddYears(100));
            }

            return result;
        }

        public async Task<IdentityResult> UnblockUser(string userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());

            var result = await userManager.SetLockoutEnabledAsync(user, false);

            if (result.Succeeded)
            {
                await userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow - TimeSpan.FromMinutes(1));
            }

            return result;
        }

        public async Task<PagedResult<UserViewDto>> GetAllUsers(int pageNumber, int pageSize)
        {
            //var query = userRepo.AsQueryable().Include(x => x.Role).ThenInclude(ur => ur.Name);

            // Загальна кількість користувачів
            //var totalUsers = await query.CountAsync();

            // Повернення користувачів для конкретної сторінки
            //var users = await query
            //    .Skip((pageNumber - 1) * pageSize)
            //    .Take(pageSize)
            //    .ToListAsync();

            //var userDtos = mapper.Map<List<UserViewDto>>(users);

            //return new PagedResult<UserViewDto>
            //{
            //    Items = userDtos,
            //    TotalCount = totalUsers,
            //    PageSize = pageSize,
            //    CurrentPage = pageNumber
            //};
            throw new Exception();
        }
    }
}
