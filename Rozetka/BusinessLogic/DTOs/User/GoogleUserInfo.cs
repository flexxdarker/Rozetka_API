﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.User
{
    public class GoogleUserInfo
    {
        public string Sub { get; set; } = string.Empty; // Унікальний ідентифікатор користувача
        public string Name { get; set; } = string.Empty; // Ім'я користувача
        public string Given_Name { get; set; } = string.Empty; // Ім'я
        public string Family_Name { get; set; } = string.Empty; // Прізвище
        public string Picture { get; set; } = string.Empty; // URL до фотографії
        public string Email { get; set; } = string.Empty; // Email користувача
    }
}
