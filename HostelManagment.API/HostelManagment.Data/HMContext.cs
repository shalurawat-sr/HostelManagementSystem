using HostelManagment.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Data
{
    public class HMContext : DbContext
    {
        public HMContext() : base("HMDBConnectionString")
        {
        }
        public DbSet<Admins> Admins { get; set; }
        public DbSet<Students> Students { get; set; }
        public DbSet<Rooms> Rooms { get; set; }
        public DbSet<RoomAllocation> RoomAllocation { get; set; }
    }
}
