using BusinessLogic.Enities;
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
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }    
        public DbSet<OrderAdvert> OrderAdverts { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<FilterValue> FilterValues { get; set; }
        public DbSet<Advert> Adverts { get; set; }
        public DbSet<AdvertRating> AdvertRatings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Role> Role { get; set; }

        public RozetkaDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.SeedData();
            
            //AdvertRating
            modelBuilder.Entity<AdvertRating>()
            .HasKey(cf => cf.Id);

            modelBuilder.Entity<AdvertRating>()
                .HasOne(cf => cf.User)
                .WithMany(c => c.AdvertRatings)
                .HasForeignKey(cf => cf.UserId);

            modelBuilder.Entity<AdvertRating>()
                .HasOne(cf => cf.Advert)
                .WithMany(f => f.AdvertRatings)
                .HasForeignKey(cf => cf.AdvertId);

            //CategoryFilter
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

            //advert
            modelBuilder.Entity<Advert>()
                .HasKey(cf => cf.Id);

            modelBuilder.Entity<Advert>()
                .HasOne(cf => cf.Category)
                .WithMany(cf => cf.Adverts)
                .HasForeignKey(cf => cf.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            //advertValue
            modelBuilder.Entity<AdvertValue>()
            .HasKey(cf => cf.Id);

            modelBuilder.Entity<AdvertValue>()
                .HasOne(cf => cf.Advert)
                .WithMany(c => c.Values)
                .HasForeignKey(cf => cf.AdvertId);

            modelBuilder.Entity<AdvertValue>()
                .HasOne(cf => cf.Value)
                .WithMany(f => f.Adverts)
                .HasForeignKey(cf => cf.ValueId);

            //order advert
            modelBuilder.Entity<OrderAdvert>()
                .HasKey(cf => cf.Id);

            modelBuilder.Entity<OrderAdvert>()
                .HasOne(cf => cf.Order)
                .WithMany(cf => cf.OrderAdverts)
                .HasForeignKey(cf=>cf.OrderId);

            modelBuilder.Entity<OrderAdvert>()
                .HasOne(cf=>cf.Advert)
                .WithMany(cf=>cf.Orders)
                .HasForeignKey(cf=>cf.AdvertId);

            //order status
            modelBuilder.Entity<OrderStatus>()
                .HasKey(cf => cf.Id);

            modelBuilder.Entity<OrderStatus>()
                .HasMany(cf=>cf.Orders)
                .WithOne(cf=>cf.OrderStatus)
                .HasForeignKey(cf=>cf.OrderStatusId);

            //order
            modelBuilder.Entity<Order>()
                .HasKey(cf=>cf.Id);

            //role
            modelBuilder.Entity<Role>()
                .HasMany(cf => cf.UserRoles)
                .WithOne(cf => cf.Role)
                .HasForeignKey(cf=>cf.RoleId);

            //user
            modelBuilder.Entity<User>()
                .HasKey(cf => cf.Id);

            modelBuilder.Entity<User>()
                .HasMany(cf => cf.UserRoles)
                .WithOne(cf => cf.User)
                .HasForeignKey(cf => cf.UserId);

            modelBuilder.Entity<User>()
                .HasMany(cf => cf.Orders)
                .WithOne(cf => cf.User)
                .HasForeignKey(cf => cf.UserId);

            modelBuilder.Entity<User>()
                .HasMany(cf => cf.RefreshTokens)
                .WithOne(cf => cf.User)
                .HasForeignKey(cf => cf.UserId);

            //userRole
            modelBuilder.Entity<UserRole>()
                .HasKey(cf => new {cf.RoleId, cf.UserId});
        }


    }
}
