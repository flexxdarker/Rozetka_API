using BusinessLogic.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace Rozetka_Api
{
    public static class ServiceExtensions
    {
        public static void AddJWT(this IServiceCollection services, IConfiguration configuration)
        {
            //var jwtOpts = configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>()!;
            var jwtSecretKey = configuration.GetSection("JwtSecretKey").Value!;
            var singinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = singinKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

        }
    }
}