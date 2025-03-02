using BusinessLogic.Enities;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Bcpg.OpenPgp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Entities
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Birthdate { get; set; }
        public int? AvatarId { get; set; }
        public Avatar Avatar { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<RefreshToken>? RefreshTokens { get; set; }
        public ICollection<AdvertRating> AdvertRatings { get; set; } = new HashSet<AdvertRating>();

    }
}
