using Ardalis.Specification;
using BusinessLogic.DTOs.Advert;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repostories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<TEntity?> GetByIDAsync(object id);
        Task<bool> AnyAsync();
        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> exp);
        Task<int> CountAsync(Expression<Func<TEntity, bool>> exp);
        Task InsertAsync(TEntity entity);
        Task AddRangeAsync(IEnumerable<TEntity> entities);
        void Delete(object id);
        Task DeleteAsync(object id);
        void Delete(TEntity entityToDelete);
        void Update(TEntity entityToUpdate);
        Task SaveAsync();
        Task<TEntity?> GetItemBySpec(ISpecification<TEntity> specification);
        Task<IEnumerable<TEntity>> GetListBySpec(ISpecification<TEntity> specification);
    }
}
