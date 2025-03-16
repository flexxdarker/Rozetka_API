using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.Basket
{
    public class AddAdvertDto
    {
        public List<int>? AdvertsIds { get; set; }
        public List<int>? Amount {  get; set; }
    }
}
