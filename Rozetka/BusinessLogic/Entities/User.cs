using BusinessLogic.Enities;
using Microsoft.AspNetCore.Identity;
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
        public string Image { get; set; } = string.Empty;
        public DateTime Birthdate { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<RefreshToken>? RefreshTokens { get; set; }
        public ICollection<AdvertRating> AdvertRatings { get; set; } = new HashSet<AdvertRating>();

    }
}
