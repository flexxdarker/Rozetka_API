using AutoMapper;
using BusinessLogic.DTOs.User;
using BusinessLogic.Enities;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Models.UserModels;
using BusinessLogic.Specifications;
using DataAccess.Repostories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

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

        public AccountsService(UserManager<User> userManager,
                                SignInManager<User> signInManager,
                                IMapper mapper,
                                IJwtService jwtService,
                                IRepository<RefreshToken> refreshTokenR,
                                IBasketService basketService,
                                IRepository<Basket> basketRepos)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.jwtService = jwtService;
            this.refreshTokenR = refreshTokenR;
            this.basketService = basketService;
            this.basketRepo = basketRepos;
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

            //LoginResponseDto loginResponse = new LoginResponseDto();
            //var user = await userManager.FindByEmailAsync(model.Email);

            //if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
            //    throw new HttpException("Invalid user login or password.", HttpStatusCode.BadRequest);

            ////await signInManager.SignInAsync(user, true);

            //// generate token
            //loginResponse.AccessToken = jwtService.CreateToken(jwtService.GetClaims(user));
            //loginResponse.RefreshToken = CreateRefreshToken(user.Id).Token;


            //if (model.Baskets.Count > 0)
            //{

            //    // Перетворюємо кошик у масив
            //    var basketArray = model.Baskets.ToArray();

            //    // Якщо користувач передав кошик із товарами
            //    if (basketArray.Length > 0)
            //    {
            //        // Зберігаємо кошик користувача в базу даних
            //        await basketService.pushBasketArray(user.Id, basketArray);

            //        // Отримуємо поточний кошик користувача з бази
            //        var array = await basketRepo.GetAsync();

            //        // Вибираємо товари тільки для цього користувача
            //        List<Basket> arrayUser = array.Where(x => x.UserId == user.Id).ToList();

            //        // Створюємо список ID продуктів із кошика
            //        List<int> newListIdBasket = arrayUser.Select(item => item.AdvertId).ToList();

            //        // Передаємо список ID продуктів у відповідь
            //        loginResponse.Baskets = newListIdBasket;
            //    }
            //    else
            //    {
            //        loginResponse.Baskets = null; // Якщо кошик порожній
            //    }
            //}
            //else
            //{

            //    // Отримуємо поточний кошик користувача з бази
            //    var array = await basketRepo.GetAsync();

            //    // Вибираємо товари тільки для цього користувача
            //    List<Basket> arrayUser = array.Where(x => x.UserId == user.Id).ToList();

            //    // Створюємо список ID продуктів із кошика
            //    List<int> newListIdBasket = arrayUser.Select(item => item.AdvertId).ToList();

            //    // Передаємо список ID продуктів у відповідь
            //    loginResponse.Baskets = newListIdBasket;
            //}

            //if (model.OrderItem.Count > 0)
            //{

            //    await basketService.PushOrderWhenLogin(user.Id, model.OrderItem);
            //}

            //return new LoginResponseDto();
            
            
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
                throw new HttpException("Invalid user login or password.", HttpStatusCode.BadRequest);

            //await signInManager.SignInAsync(user, true);

            // generate token
            return new LoginResponseDto
            {
                AccessToken = jwtService.CreateToken(jwtService.GetClaims(user)),
                RefreshToken = CreateRefreshToken(user.Id).Token
            };

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
    }
}
