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
    public class AdvertConfigs : IEntityTypeConfiguration<Advert>
    {
        public void Configure(EntityTypeBuilder<Advert> modelBuilder)
        {
            //advert
            modelBuilder.HasKey(a => a.Id);

            modelBuilder.HasOne(a => a.Category)
                .WithMany(c => c.Adverts)
                .HasForeignKey(a => a.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.HasMany(a => a.Images)
                .WithOne(i => i.Advert)
                .HasForeignKey(i => i.AdvertId)
                .OnDelete(DeleteBehavior.Cascade); ;
        }
    }
}

