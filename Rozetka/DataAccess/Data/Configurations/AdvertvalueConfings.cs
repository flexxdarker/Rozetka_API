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
    public class AdvertValueConfigs : IEntityTypeConfiguration<AdvertValue>
    {
        public void Configure(EntityTypeBuilder<AdvertValue> modelBuilder)
        {
            //advertValue
            modelBuilder.HasKey(cf => cf.Id);

            modelBuilder.HasOne(av => av.Advert)
                .WithMany(a => a.Values)
                .HasForeignKey(av => av.AdvertId);

            modelBuilder.HasOne(av => av.Value)
                .WithMany(fv => fv.Adverts)
                .HasForeignKey(av => av.ValueId);
        }
    }
}

