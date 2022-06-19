using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Models.DBModels
{
    public class Rooms
    {
        [Key]
        public int Id { get; set; }
        public int RoomNo { get; set; }
        public string RoomType { get; set; }
        public int BedsCount { get; set; }
        public int AllotedBedsCount { get; set; }
        public double Fee { get; set; }
        public bool IsActive { get; set; }
    }
}
