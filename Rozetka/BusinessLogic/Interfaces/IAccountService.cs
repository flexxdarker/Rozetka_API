﻿using BusinessLogic.DTOs.User;
using BusinessLogic.Entities;
using BusinessLogic.Models.UserModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IAccountsService
    {
        Task<RegisterResultDto> Register(RegisterModel model);
        Task<LoginResponseDto> Login(LoginModel model);
        //Task Logout(string refreshToken);
        //Task<UserTokens> RefreshTokens(UserTokens tokens);
        Task<LoginResponseDto> GoogleSignInAsync(GoogleLoginDto loginDto);
        Task EditUserAsync(UserEditDto editUserDto, string userId);
        Task<IdentityResult> ChangePasswordAsync(ChangePasswordDto model, string idUser);
        Task<UserViewDto> GetUser(string id);
        Task<IdentityResult> BlockUser(string userId);
        Task<IdentityResult> UnblockUser(string userId);
        Task<List<UserViewDto>> GetAllUsers();
        Task RemoveExpiredRefreshTokens();
        Task<bool> ChangeRole(string userId);

        //Task<ResetToken> GenerageResetToken(string email);
        //Task ResetPassword(ResetPasswordModel model);
    }

    // TODO: create endpoints for resetting user password 
    public class ResetToken
    {
        public string Token { get; set; }
    }
    public class ResetPasswordModel
    {
        public string NewPassword { get; set; }
        public string Token { get; set; }
    }
}
