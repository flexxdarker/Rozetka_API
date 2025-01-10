﻿using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Enities
{
    public class Cart
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User? User { get; set; }
        public decimal TotalSumm { get; set; }
        public ICollection<Advert>? Adverts { get; set; }
    }
}
