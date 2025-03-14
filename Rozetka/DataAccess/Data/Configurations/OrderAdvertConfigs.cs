using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using BusinessLogic.Enities;

namespace DataAccess.Data.Configurations
{
    public class OrderAdvertConfigs : IEntityTypeConfiguration<OrderAdvert>
    {
        public void Configure(EntityTypeBuilder<OrderAdvert> modelBuilder)
        {
            //order advert
            modelBuilder.HasKey(cf => cf.Id);

            modelBuilder.HasOne(cf => cf.Order)
                .WithMany(cf => cf.OrderAdverts)
                .HasForeignKey(cf => cf.OrderId);

            modelBuilder.HasOne(cf => cf.Advert)
                .WithMany(cf => cf.Orders)
                .HasForeignKey(cf => cf.AdvertId);
        }
    }
}

