using BusinessLogic.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.User
{
    public class UserTokenInfo
    {
        public string Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string SurName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Birthday { get; set; }
        public string AvatarPath { get; set; }
        public string? PhoneNumber { get; set; }
        public List<string>? Roles { get; set; }
    }
}
