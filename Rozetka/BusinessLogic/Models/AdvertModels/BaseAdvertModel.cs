﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Models.AdvertModels
{
    public abstract class BaseAdvertModel
    {
        public int CategoryId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
        public string Discount { get; set; } = string.Empty;
        public IEnumerable<int> Values { get; set; } = new HashSet<int>();
        public ICollection<IFormFile> ImageFiles { get; init; } = new HashSet<IFormFile>();
    }
}
