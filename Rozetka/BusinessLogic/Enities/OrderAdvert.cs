using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Enities
{
    public class OrderAdvert
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int AdvertId { get; set; }
        public Advert Advert { get; set; }
        //Count of product  
        public int Count { get; set; }
        //Price of product
        public decimal Price { get; set; }
    }
}
