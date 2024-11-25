using BusinessLogic.Entities.Filter;
using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public ICollection<Advert> Adverts { get; set; } = new HashSet<Advert>();
        public ICollection<CategoryFilter> Filters { get; set; } = new HashSet<CategoryFilter>();

    }
}
