using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.User;
using BusinessLogic.Entities;
using BusinessLogic.Exceptions;
using BusinessLogic.Helpers;
using BusinessLogic.Interfaces;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace BusinessLogic.Services
{
    internal class JwtService : IJwtService
    {
        private readonly IConfiguration _config;
        private readonly IConfiguration configuration;
        private readonly UserManager<User> userManager;
        private readonly JwtOptions jwtOptions;
        private readonly IRepository<Avatar> avatarRepository;

        public JwtService(IConfiguration configuration, UserManager<User> userManager, IConfiguration config, IRepository<Avatar> avatarRepository)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.jwtOptions = configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>()!;
            _config = config;
            this.avatarRepository = avatarRepository;
        }

        public async Task<string> CreateToken(UserTokenInfo user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user), "User cannot be null");

            var userDb = await userManager.FindByIdAsync(user.Id);
            if (userDb == null)
                throw new Exception($"User with ID {user.Id} not found");

            var roles = await userManager.GetRolesAsync(userDb) ?? new List<string>();

            // Формуємо список клеймів
            List<Claim> claims = new()
    {
        new Claim("id", user.Id.ToString()),
        new Claim("Name", user.Name ?? string.Empty),
        new Claim("SurName", user.SurName ?? string.Empty),
        new Claim("email", user.Email ?? string.Empty),
        new Claim("phoneNumber", user.PhoneNumber ?? string.Empty),
        new Claim("avatar", user.AvatarPath), // Перевірка на null
        new Claim("birthdate", user.Birthday ?? string.Empty),  // Перевірка на null
    };

            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            var secretKey = _config.GetValue<string>("JwtSecretKey");
            if (string.IsNullOrEmpty(secretKey))
                throw new Exception("JWT Secret Key is missing in configuration");

            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(10),
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public string CreateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public IEnumerable<Claim> GetClaimsFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = false,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtOptions.Issuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Key)),
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken jwtSecurityToken;

            tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null ||
                !jwtSecurityToken.Header.Alg
                    .Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new HttpException(Errors.InvalidToken,HttpStatusCode.BadRequest);
            }

            return jwtSecurityToken.Claims;
        }

        public DateTime GetLastValidRefreshTokenDate()
        {
            return DateTime.UtcNow.AddDays(-jwtOptions.RefreshTokenLifetimeInDays);
        }
    }
}
