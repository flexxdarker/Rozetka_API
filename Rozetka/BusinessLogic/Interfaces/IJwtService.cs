using BusinessLogic.DTOs.User;
using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IJwtService
    {
        Task<string> CreateToken(UserTokenInfo user);

        string CreateRefreshToken();
        IEnumerable<Claim> GetClaimsFromExpiredToken(string token);
        DateTime GetLastValidRefreshTokenDate();
    }
}
