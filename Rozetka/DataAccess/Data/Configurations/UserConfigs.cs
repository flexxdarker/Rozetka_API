using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogic.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace DataAccess.Data.Configurations
{
    public class UserConfigs : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> modelBuilder)
        {
            //user
            modelBuilder.HasKey(cf => cf.Id);

            modelBuilder.HasMany(cf => cf.UserRoles)
                .WithOne(cf => cf.User)
                .HasForeignKey(cf => cf.UserId);

            modelBuilder.HasMany(cf => cf.Orders)
                .WithOne(cf => cf.User)
                .HasForeignKey(cf => cf.UserId);

            modelBuilder.HasMany(cf => cf.RefreshTokens)
                .WithOne(cf => cf.User)
                .HasForeignKey(cf => cf.UserId);
        }
    }
}

