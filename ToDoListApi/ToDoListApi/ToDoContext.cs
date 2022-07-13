using Microsoft.EntityFrameworkCore;

namespace ToDoListApi
{
    public class ToDoContext:DbContext
    {
        public ToDoContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}
