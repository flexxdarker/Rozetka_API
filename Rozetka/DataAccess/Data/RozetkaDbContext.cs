using BusinessLogic.Enities;
using BusinessLogic.Entities;
using BusinessLogic.Entities.Filter;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data
{
    public class RozetkaDbContext : IdentityDbContext<User>
    {
        public DbSet<AdvertValue> AdvertValues { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CategoryFilter> CategoryFilters { get; set; }
        public DbSet<Filter> Filters { get; set; }
        public DbSet<FilterValue> FilterValues { get; set; }
        public DbSet<Advert> Adverts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<User> User { get; set; }
        public RozetkaDbContext(DbContextOptions options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            //modelBuilder.SeedData();
        }


    }
}
