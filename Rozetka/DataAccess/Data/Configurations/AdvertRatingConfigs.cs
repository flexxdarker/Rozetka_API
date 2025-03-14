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
    public class AdvertRatingConfigs : IEntityTypeConfiguration<AdvertRating>
    {
        public void Configure(EntityTypeBuilder<AdvertRating> modelBuilder)
        {
            //AdvertRating
            modelBuilder.HasKey(cf => cf.Id);

            modelBuilder.HasOne(cf => cf.User)
                .WithMany(c => c.AdvertRatings)
                .HasForeignKey(cf => cf.UserId);

            modelBuilder.HasOne(cf => cf.Advert)
                .WithMany(f => f.AdvertRatings)
                .HasForeignKey(cf => cf.AdvertId);
        }
    }
}

