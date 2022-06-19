using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Models
{
    public class LoginResponse
    {
        public LoginResponse()
        {
            this.Token = "";
            this.responseMsg = new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.Unauthorized };
        }

        public string Token { get; set; }
        public string Username { get; set; }
        public int UserId { get; set; }
        public string EmailId { get; set; }
        public HttpResponseMessage responseMsg { get; set; }
    }

}
