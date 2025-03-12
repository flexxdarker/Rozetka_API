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
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
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
        private readonly IImageService imageService;
        private readonly IRepository<Avatar> avatarRepository;

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
                                IRepository<User> userRepo,
                                IImageService imageService,
                                IRepository<Avatar> avatarRepository)
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
            this.imageService = imageService;
            this.avatarRepository = avatarRepository;
        }

        public async Task<RegisterResultDto> Register(RegisterModel model)
        {
            RegisterResultDto registerResultDto = new RegisterResultDto();

            // Маппінг об'єкта dto на об'єкт UserEntity за допомогою _mapper
            User user = mapper.Map<User>(model);

            // Перевірка, чи такий email вже зареєстрований
            var existingUser = await userManager.FindByEmailAsync(model.Email);

            if (existingUser == null)
            {
                var avatar = await imageService.SaveImageAsync(model.Avatar);
                user.Avatar.Name = avatar;
                user.Avatar.UserId = user.Id;
                user.Birthdate = DateTime.SpecifyKind(model.Birthdate, DateTimeKind.Utc);
                //user.Birthdate = DateTime.UtcNow;
                // Асинхронне створення нового користувача з паролем
                var resultCreated = await userManager.CreateAsync(user, model.Password);

                // Перевірка результату створення користувача
                if (!resultCreated.Succeeded)
                {
                    registerResultDto.IsSuccess = false;
                    // Логування помилок створення користувача
                    registerResultDto.Error = string.Join($"Не вдалося створити користувача", ",", resultCreated.Errors.Select(e => e.Description));
                    return registerResultDto;
                }

                await userManager.SetLockoutEnabledAsync(user, false);
                await userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow - TimeSpan.FromMinutes(1));

                //if (resultCreated.Succeeded)
                //{
                //    try
                //    {
                //        smtpService.SuccessfulLogin(model.Name + " " + model.Surname, model.Email);
                //    }
                //    catch (Exception ex)
                //    {
                //        registerResultDto.IsSuccess = false;
                //        registerResultDto.Error = $"Лист на пошту відправити не вдалося";
                //        return registerResultDto;
                //    }
                //}
            }
            else
            {
                registerResultDto.IsSuccess = false;
                registerResultDto.Error = $"Така пошта уже зареєстрована";
                return registerResultDto;
            }

            // Асинхронне додавання створеного користувача до певної ролі
            var resultRole = await userManager.AddToRoleAsync(user, Roles.User);

            var createdUser = await userManager.FindByEmailAsync(model.Email);

            // Перевірка результату додавання до ролі
            if (!resultRole.Succeeded)
            {
                registerResultDto.IsSuccess = false;
                registerResultDto.Error = string.Join($"Не вдалося додати роль користувачу:", ", ", resultRole.Errors.Select(e => e.Description));
                return registerResultDto;
            }
            else
            {
                
                registerResultDto.IsSuccess = true;
                return registerResultDto;
            }
        }

        public async Task<LoginResponseDto> Login(LoginModel model)
        {

            //var user = await userManager.FindByEmailAsync(model.Email);

            //LoginResponseDto loginResultDto = new LoginResponseDto();

            //if (user == null)
            //{
            //    loginResultDto.IsSuccess = false;
            //    loginResultDto.Error = "Incorect data!";
            //    return loginResultDto;
            //}
            //var isAuth = await userManager.CheckPasswordAsync(user, model.Password);

            //if (!isAuth)
            //{
            //    loginResultDto.IsSuccess = false;
            //    loginResultDto.Error = "Incorect data!";
            //    return loginResultDto;
            //}

            //if (user.LockoutEnabled == true)
            //{
            //    loginResultDto.IsSuccess = false;

            //    string lockoutDate = user.LockoutEnd.HasValue
            //        ? user.LockoutEnd.Value.ToString("MM/dd/yyyy")
            //        : "невідомо";

            //    loginResultDto.Error = $"Користувач {user.Name} {user.SurName} ЗАБЛОКОВАНИЙ до {lockoutDate}";
            //    return loginResultDto;
            //}

            //var person = userRepo.AsQueryable()
            //   .FirstOrDefault(x => x.Id == user.Id);

            //var roles = await userManager.GetRolesAsync(user);

            //var avatar = avatarRepository.AsQueryable().FirstOrDefault(x => x.UserId == user.Id).Name;

            //var userTokenInfo = new UserTokenInfo
            //{
            //    Id = person.Id, 
            //    Name = person.Name,
            //    SurName = person.SurName,
            //    Email = person.Email,
            //    Birthday = person.Birthdate.ToString("dd-MM-yyyy"),
            //    AvatarPath = avatar,
            //    PhoneNumber = person.PhoneNumber,
            //    Roles = roles.ToList(),
            //};

            //var token = await jwtService.CreateToken(userTokenInfo);

            //loginResultDto.AccessToken = token;

            //if (model.Baskets != null)
            //{

            //    // Перетворюємо кошик у масив
            //    //var basketArray = model.Baskets.ToArray();

            //    // Якщо користувач передав кошик із товарами
            //    if (model.Baskets.AdvertsIds.Count > 0)
            //    {
            //        // Зберігаємо кошик користувача в базу даних

            //        await  basketService.pushBasketArray(user.Id, );

            //        // Отримуємо поточний кошик користувача з бази
            //        var array = await basketRepo.GetAsync();

            //        // Вибираємо товари тільки для цього користувача
            //        List<Basket> arrayUser = array.Where(x => x.UserId == user.Id).ToList();

            //        // Створюємо список ID продуктів із кошика
            //        List<int> newListIdBasket = arrayUser.Select(item => item.AdvertId).ToList();

            //        // Передаємо список ID продуктів у відповідь
            //        loginResultDto.Baskets = newListIdBasket;
            //    }
            //    else
            //    {
            //        loginResultDto.Baskets = null; // Якщо кошик порожній
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
            //    loginResultDto.Baskets = newListIdBasket;
            //}

            //if (model.OrderItem != null)
            //{
            //    await basketService.PushOrderWhenLogin(user.Id, model.OrderItem);
            //}
            //loginResultDto.IsSuccess = true;

            //return loginResultDto;


            var user = await userManager.FindByEmailAsync(model.Email);
            var loginResultDto = new LoginResponseDto();

            if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
            {
                loginResultDto.IsSuccess = false;
                loginResultDto.Error = "Incorrect data!";
                return loginResultDto;
            }

            if (user.LockoutEnabled)
            {
                string lockoutDate = user.LockoutEnd?.ToString("MM/dd/yyyy") ?? "невідомо";
                loginResultDto.IsSuccess = false;
                loginResultDto.Error = $"Користувач {user.Name} {user.SurName} ЗАБЛОКОВАНИЙ до {lockoutDate}";
                return loginResultDto;
            }

            var person = userRepo.AsQueryable().FirstOrDefault(x => x.Id == user.Id);
            var roles = await userManager.GetRolesAsync(user);
            var avatar = avatarRepository.AsQueryable().FirstOrDefault(x => x.UserId == user.Id)?.Name;

            var userTokenInfo = new UserTokenInfo
            {
                Id = person.Id,
                Name = person.Name,
                SurName = person.SurName,
                Email = person.Email,
                Birthday = person.Birthdate.ToString("dd-MM-yyyy"),
                AvatarPath = avatar,
                PhoneNumber = person.PhoneNumber,
                Roles = roles.ToList(),
            };

            loginResultDto.AccessToken = await jwtService.CreateToken(userTokenInfo);

            if (model.Baskets != null && model.Baskets.AdvertsIds != null)
            {
                await basketService.pushBasketArray(user.Id, model.Baskets);
            }

            var arrayUser = (await basketRepo.GetAsync()).Where(x => x.UserId == user.Id).ToList();
            loginResultDto.Baskets = arrayUser.Select(item => item.AdvertId).ToList();

            if (model.OrderItem != null)
            {
                await basketService.PushOrderWhenLogin(user.Id, model.OrderItem);
            }

            loginResultDto.IsSuccess = true;
            return loginResultDto;
        }   

        //private RefreshToken CreateRefreshToken(string userId)
        //{
        //    var refeshToken = jwtService.CreateRefreshToken();

        //    var refreshTokenEntity = new RefreshToken
        //    {
        //        Token = refeshToken,
        //        UserId = userId,
        //        CreationDate = DateTime.UtcNow // Now vs UtcNow
        //    };

        //    refreshTokenR.InsertAsync(refreshTokenEntity);
        //    refreshTokenR.SaveAsync();

        //    return refreshTokenEntity;
        //}

        ////public async Task<UserTokens> RefreshTokens(UserTokens userTokens)
        ////{
        ////    var refrestToken = await refreshTokenR.GetItemBySpec(new RefreshTokenSpecs.ByToken(userTokens.RefreshToken));

        ////    if (refrestToken == null)
        ////        throw new HttpException(Errors.InvalidToken, HttpStatusCode.BadRequest);

        ////    var claims = jwtService.GetClaimsFromExpiredToken(userTokens.AccessToken);
        ////    var newAccessToken = claims;
        ////    var newRefreshToken = jwtService.CreateRefreshToken();

        ////    refrestToken.Token = newRefreshToken;

        ////    // TODO: update creation time
        ////    refreshTokenR.Update(refrestToken);
        ////    await refreshTokenR.SaveAsync();

        ////    var tokens = new UserTokens()
        ////    {
        ////        AccessToken = newAccessToken,
        ////        RefreshToken = newRefreshToken
        ////    };

        ////    return tokens;
        ////}

        public async Task Logout(string refreshToken)
        {
            await signInManager.SignOutAsync();

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

        public async Task<LoginResponseDto> GoogleSignInAsync(GoogleLoginDto loginDto)
        {

            LoginResponseDto loginResponse = new LoginResponseDto();

            using HttpClient httpClient = new();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",loginDto.GoogleAccessToken);
            HttpResponseMessage response = await httpClient.GetAsync(_configuration["GoogleUserInfoUrl"]);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            var userInfo = JsonConvert.DeserializeObject<GoogleUserInfo>(responseBody)!;
            User user = await userManager.FindByEmailAsync(userInfo.Email) ?? mapper.Map<User>(userInfo);
            if (user.Id == null)
            {
                if (!String.IsNullOrEmpty(userInfo.Picture))
                {
                    user.Avatar.Name = await imageService.SaveImageFromUrlAsync(userInfo.Picture);
                    user.Avatar.UserId = user.Id;
                }
                await CreateUserAsync(user);
            }

            var avatar = avatarRepository.AsQueryable().FirstOrDefault(x => x.UserId == user.Id).Name;

            var roles = await userManager.GetRolesAsync(user);

            var userTokenInfo = new UserTokenInfo
            {
                Id = user.Id,
                Name = user.Name,
                SurName = user.SurName,
                Email = user.Email,
                Birthday = user.Birthdate.ToString("dd-MM-yyyy"),
                AvatarPath = avatar,
                PhoneNumber = user.PhoneNumber,
                Roles = roles.ToList()
            };

            if (loginDto.Baskets != null && loginDto.Baskets.AdvertsIds.Count > 0)
            {
                await basketService.pushBasketArray(user.Id, loginDto.Baskets);
            }

            var arrayUser = (await basketRepo.GetAsync()).Where(x => x.UserId == user.Id).ToList();
            loginResponse.Baskets = arrayUser.Select(item => item.AdvertId).ToList();

            if (loginDto.OrderItem != null)
            {
                await basketService.PushOrderWhenLogin(user.Id, loginDto.OrderItem);
            }

            loginResponse.IsSuccess = true;

            return loginResponse;

        }

        private async Task CreateUserAsync(User user, string? password = null, bool isAdmin = false)
        {
            var result = password is not null
                ? await userManager.CreateAsync(user, password)
                : await userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                throw new HttpException(Errors.UserCreateError, HttpStatusCode.InternalServerError);
            }
            await userManager.AddToRoleAsync(user, isAdmin ? Roles.Admin : Roles.User);
        }

        public async Task EditUserAsync(UserEditDto editUserDto, string userId)
        {

            var user = await userManager.Users
         .Include(u => u.Avatar) // Ensure Avatar is loaded
         .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Update basic user details
            user.Name = editUserDto.FirstName;
            user.SurName = editUserDto.LastName;
            user.Email = editUserDto.Email;

            // Handle Avatar update
            if (editUserDto.Avatar != null)
            {
                // Ensure user.Avatar is initialized
                if (user.Avatar == null)
                {
                    user.Avatar = new Avatar(); // Assuming Avatar is the correct class
                }

                var newAvatar = await imageService.SaveImageAsync(editUserDto.Avatar);
                user.Avatar.UserId = user.Id;
                user.Avatar.Name = newAvatar;
            }

            // Handle birthday conversion
            if (!string.IsNullOrEmpty(editUserDto.Birthday))
            {
                if (DateTime.TryParse(editUserDto.Birthday, out DateTime localDateTime))
                {
                    user.Birthdate = localDateTime.ToUniversalTime();
                }
                else
                {
                    throw new Exception("Invalid birthday format.");
                }
            }

            // Save changes
            await userManager.UpdateAsync(user);
        }

        public async Task<IdentityResult> ChangePasswordAsync(ChangePasswordDto model, string idUser)
        {
            var user = await userManager.FindByIdAsync(idUser);

            var result = await userManager.ChangePasswordAsync(user, model.currentPassword, model.newPassword);

            return result;
        }

        public async Task<UserViewDto> GetUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            
            var roles = await userManager.GetRolesAsync(user);

            var avatar = avatarRepository.AsQueryable().FirstOrDefault(x => x.UserId == user.Id).Name;

            var userView = new UserViewDto
            {
                Id = user.Id,
                FirstName = user.Name,
                LastName = user.SurName,
                Password = user.PasswordHash,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Avatar = avatar,
                BirthDate = user.Birthdate,
                Roles = string.Join(", ", roles.ToList())
            };
            return userView;
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

        public async Task<List<UserViewDto>> GetAllUsers()
        {
            var query = userRepo.AsQueryable().Include(x => x.UserRoles).ThenInclude(ur => ur.Role);

            var users = await query.Select(x => new UserViewDto
            {
                Id = x.Id,
                FirstName = x.Name,
                LastName = x.SurName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,
                Avatar = x.Avatar.Name,
                BirthDate = x.Birthdate,
                Roles = string.Join(", ", x.UserRoles.Select(ur => ur.Role.Name).ToList())
            }).ToListAsync();
            return users;
        }
    }
}
