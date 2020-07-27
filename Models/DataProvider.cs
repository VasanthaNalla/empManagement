using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace EmpManagement.Models
{
    public class DataProvider:IdentityDbContext
    {
        public DataProvider(DbContextOptions options) :base(options)
        {

        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Employee> Employees { get; set; }
    }
}
