using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class newStatuses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isCompleted",
                table: "OrderStatuses");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "OrderStatuses",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "OrderStatuses");

            migrationBuilder.AddColumn<bool>(
                name: "isCompleted",
                table: "OrderStatuses",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
