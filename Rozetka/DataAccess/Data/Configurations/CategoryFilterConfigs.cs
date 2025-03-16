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
    public class FilterConfigs : IEntityTypeConfiguration<Filter>
    {
        public void Configure(EntityTypeBuilder<Filter> modelBuilder)
        {
            //CategoryFilter
            modelBuilder.HasKey(cf => cf.Id);

            modelBuilder.HasMany(f => f.Categories)
                .WithOne(cf => cf.Filter)
                .HasForeignKey(cf => cf.FilterId);

            modelBuilder.HasMany(f => f.Values)
                .WithOne(fv => fv.Filter)
                .HasForeignKey(fv => fv.FilterId);

        }
    }
}

