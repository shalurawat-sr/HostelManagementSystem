using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Models.DBModels
{
    public class RoomAllocation
    {
        [Key]
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int RoomId { get; set; }
        public bool IsCheckout { get; set; }
    }
}
