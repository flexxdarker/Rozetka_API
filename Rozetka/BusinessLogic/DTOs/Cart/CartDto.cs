﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Advert;

namespace BusinessLogic.DTOs.Cart
{
    public class CartDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public decimal TotalSumm { get; set; }
        public IEnumerable<AdvertDto>? Adverts { get; set; }
    }
}
