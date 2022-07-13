using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoListApi.Migrations
{
    public partial class rfedvsc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "ToDoItems",
                newName: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "ToDoItems",
                newName: "Title");
        }
    }
}
