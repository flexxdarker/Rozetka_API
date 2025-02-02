using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Enities
{
    public class Basket
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public User User { get; set; }
        public int AdvertId { get; set; }
        public Advert Advert { get; set; }
        public int Count { get; set; } = 1;
        public DateTime DateAdded { get; set; }
    }
}
