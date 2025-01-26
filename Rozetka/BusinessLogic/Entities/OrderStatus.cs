using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Enities
{
    public class OrderStatus
    {
        public int Id { get; set; }
        public bool isCompleted { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
