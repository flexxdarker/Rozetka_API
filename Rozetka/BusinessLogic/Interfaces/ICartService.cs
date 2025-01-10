using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.DTOs.Advert;

namespace BusinessLogic.Interfaces
{
    public interface ICartService
    {
        Task<IEnumerable<AdvertDto>> GetAdverts();
        IEnumerable<int> GetProductIds();
        void Add(int id);
        void Remove(int id);
        int GetCount();
    }
}
