using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.Entities;
using Microsoft.AspNetCore.Http;

namespace BusinessLogic.Models.AdvertModels
{
    public class AdvertRatingCreateModel
    {
        public int Rating { get; set; }
        public int AdvertId { get; set; }
    }
}
