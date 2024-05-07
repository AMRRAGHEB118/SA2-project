using Microsoft.EntityFrameworkCore;
using BusBooking.DotNet.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BusBooking.DotNet.data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {}
    }
}