using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Models.ViewModels
{
    public class StudentsFeeDetails
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public string CollegeName { get; set; }
        public string IdProof { get; set; }
        public string EmailId { get; set; }
        public double Fee { get; set; }
        public int RoomNo { get; set; }
        public string RoomType { get; set; }
        public bool IsActive { get; set; }
        public bool IsCheckout { get; set; }
    }
}
