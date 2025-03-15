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
    public class AvatarConfigs : IEntityTypeConfiguration<Avatar>
    {
        public void Configure(EntityTypeBuilder<Avatar> modelBuilder)
        {
            //avatar
            modelBuilder.HasKey(cf => cf.Id);

            modelBuilder.HasOne(cf => cf.User)
                .WithOne(cf => cf.Avatar)
                .HasForeignKey<User>(cf => cf.AvatarId);
        }
    }
}

