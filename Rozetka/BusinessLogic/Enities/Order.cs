using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Enities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int UserId { get; set; } 
        public User? User { get; set; }
        public decimal TotalPrice { get; set; }
        public ICollection<Advert>? Adverts { get; set; }
    }
}
