using BusinessLogic.Entities;
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
        public DbSet<Filter> Filters { get; set; }
        public DbSet<CategoryFilter> CategoryFilters { get; set; }
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

            //modelBuilder.SeedData();
            modelBuilder.Entity<CategoryFilter>()
       .HasKey(cf => cf.Id);

            modelBuilder.Entity<CategoryFilter>()
                .HasOne(cf => cf.Category)
                .WithMany(c => c.Filters)
                .HasForeignKey(cf => cf.CategoryId);

            modelBuilder.Entity<CategoryFilter>()
                .HasOne(cf => cf.Filter)
                .WithMany(f => f.Categories)
                .HasForeignKey(cf => cf.FilterId);
        }


    }
}
