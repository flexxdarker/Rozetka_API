using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryFilters_Categories_CategoryId",
                table: "CategoryFilters");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryFilters_Filters_FilterId",
                table: "CategoryFilters");

            migrationBuilder.DropTable(
                name: "AdvertValues");

            migrationBuilder.AlterColumn<int>(
                name: "FilterId",
                table: "CategoryFilters",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "CategoryFilters",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "AdvertFilterValue",
                columns: table => new
                {
                    AdvertsId = table.Column<int>(type: "integer", nullable: false),
                    FilterValuesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvertFilterValue", x => new { x.AdvertsId, x.FilterValuesId });
                    table.ForeignKey(
                        name: "FK_AdvertFilterValue_Adverts_AdvertsId",
                        column: x => x.AdvertsId,
                        principalTable: "Adverts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdvertFilterValue_FilterValues_FilterValuesId",
                        column: x => x.FilterValuesId,
                        principalTable: "FilterValues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdvertFilterValue_FilterValuesId",
                table: "AdvertFilterValue",
                column: "FilterValuesId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryFilters_Categories_CategoryId",
                table: "CategoryFilters",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryFilters_Filters_FilterId",
                table: "CategoryFilters",
                column: "FilterId",
                principalTable: "Filters",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryFilters_Categories_CategoryId",
                table: "CategoryFilters");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryFilters_Filters_FilterId",
                table: "CategoryFilters");

            migrationBuilder.DropTable(
                name: "AdvertFilterValue");

            migrationBuilder.AlterColumn<int>(
                name: "FilterId",
                table: "CategoryFilters",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "CategoryFilters",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "AdvertValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AdvertId = table.Column<int>(type: "integer", nullable: false),
                    FilterValueId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvertValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdvertValues_Adverts_AdvertId",
                        column: x => x.AdvertId,
                        principalTable: "Adverts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdvertValues_FilterValues_FilterValueId",
                        column: x => x.FilterValueId,
                        principalTable: "FilterValues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdvertValues_AdvertId",
                table: "AdvertValues",
                column: "AdvertId");

            migrationBuilder.CreateIndex(
                name: "IX_AdvertValues_FilterValueId",
                table: "AdvertValues",
                column: "FilterValueId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryFilters_Categories_CategoryId",
                table: "CategoryFilters",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryFilters_Filters_FilterId",
                table: "CategoryFilters",
                column: "FilterId",
                principalTable: "Filters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
