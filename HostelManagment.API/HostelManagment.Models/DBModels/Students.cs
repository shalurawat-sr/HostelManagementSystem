using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Models.DBModels
{
    public class Students
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string DOB { get; set; }
        public string Gender { get; set; }
        public string EmailId { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 10)]
        [RegularExpression("[0-9]+")]
        public string MobileNo { get; set; }
        public string CollegeName { get; set; }
        public string Address { get; set; }
        [Required]
        [StringLength(12,MinimumLength =12)]
        [RegularExpression("[0-9]+")]
        public string IdProof { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
