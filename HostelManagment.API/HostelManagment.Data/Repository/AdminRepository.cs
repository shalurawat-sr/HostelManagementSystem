using HostelManagment.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Data.Repository
{
    public class AdminRepository
    {
        private HMContext _hmbContext = new HMContext();

        public string AdminRegistration(Admins admin)
        {
            string responseMessage = null;
            var get_user = _hmbContext.Admins.FirstOrDefault(a => a.Username == admin.Username);
            if (get_user == null)
            {
                _hmbContext.Admins.Add(admin);
                _hmbContext.SaveChanges();
            }
            else
            {
                responseMessage = "UserName already exists: " + admin.Username;
            }
            responseMessage = "Successfully Registered";
            return responseMessage;
        }

        public Admins GetAdminProfile(int adminId)
        {
            var get_user = _hmbContext.Admins.FirstOrDefault(a => a.Id == adminId);
            return get_user;
        }

        public string UpdateAdminProfile(Admins admin)
        {
            string responseMessage = null;
            var get_AdminObj = _hmbContext.Admins.FirstOrDefault(a => a.Id == admin.Id);

            if (get_AdminObj != null)
            {
                get_AdminObj.Name = admin.Name;
                get_AdminObj.EmailId = admin.EmailId;
                get_AdminObj.Password = admin.Password;
                _hmbContext.SaveChanges();
                responseMessage = "Updated Profile Successfully...";
            }
            else
            {
                responseMessage = "There is No Found with the provided username";
            }
            return responseMessage;
        }
    }
}
