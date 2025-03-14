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
    public class OrderStatusConfigs : IEntityTypeConfiguration<OrderStatus>
    {
        public void Configure(EntityTypeBuilder<OrderStatus> modelBuilder)
        {
            //order status
            modelBuilder.HasKey(cf => cf.Id);

            modelBuilder.HasMany(cf => cf.Orders)
                .WithOne(cf => cf.OrderStatus)
                .HasForeignKey(cf => cf.OrderStatusId);
        }
    }
}

