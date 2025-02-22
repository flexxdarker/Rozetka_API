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

        public JwtService(IConfiguration configuration, UserManager<User> userManager, IConfiguration config)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.jwtOptions = configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>()!;
            _config = config;
        }

        public async Task<string> CreateToken(UserTokenInfo user)
        {
            // TODO: make separate method
            var userDb = await userManager.FindByIdAsync(user.Id);

            var roles = await userManager.GetRolesAsync(userDb);

            // Формуємо список клеймів
            List<Claim> claims = new()
            {
              new Claim("id", user.Id.ToString()),
              new Claim("Name", user.Name),
              new Claim("SurName", user.SurName),
              new Claim("email", user.Email),
              new Claim("phoneNumber", user.PhoneNumber ?? string.Empty),
              new Claim("image", user.Image ?? string.Empty),
              new Claim("birthdate", user.Birthday ?? string.Empty),
             };

            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<System.String>("JwtSecretKey")));
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
