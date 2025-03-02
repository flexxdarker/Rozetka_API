using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs.AdvertValue
{
    public class AdvertValueDto
    {
        public int Id { get; set; }
        public int AdvertId { get; set; }
        public int ValueId { get; set; }
    }
}
