using HostelManagment.Models;
using HostelManagment.Models.DBModels;
using HostelManagment.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Data.Repository
{
    public class LoginRepository
    {
        private readonly HMContext _hmDbContext = new HMContext();
        public LoginResponse UserLoginCheck(LoginRequest loginRequest)
        {
            LoginResponse loginResponse = new LoginResponse();
            if (loginRequest.IsAdmin)
            {
                var response = _hmDbContext.Admins.Where(a => a.Username == loginRequest.Username &&
                                a.Password == loginRequest.Password).FirstOrDefault();
                if (response != null)
                {
                    loginResponse.Username = response.Username;
                    loginResponse.EmailId = response.EmailId;
                    loginResponse.UserId = response.Id;
                }
                return loginResponse;
            }
            else
            {
                var response = _hmDbContext.Students.Where(a => a.Username == loginRequest.Username &&
                                a.Password == loginRequest.Password).FirstOrDefault();
                if (response != null)
                {
                    loginResponse.Username = response.Username;
                    loginResponse.EmailId = response.EmailId;
                    loginResponse.UserId = response.Id;
                }
                return loginResponse;
            }
        }
    }

}
