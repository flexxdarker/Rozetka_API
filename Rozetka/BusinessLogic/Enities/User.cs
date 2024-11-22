using BusinessLogic.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Enities
{
    public class User : IdentityUser
    {
        public DateTime Birthdate { get; set; }
        public ICollection<RefreshToken>? RefreshTokens { get; set; }
    }
}
