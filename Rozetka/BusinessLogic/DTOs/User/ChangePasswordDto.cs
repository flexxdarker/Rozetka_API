using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.User
{
    public class ChangePasswordDto
    {
        public string currentPassword { get; set; }
        public string newPassword { get; set; }
    }
}
