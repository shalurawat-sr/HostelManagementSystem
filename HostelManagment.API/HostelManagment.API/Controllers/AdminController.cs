using HostelManagment.Data.Repository;
using HostelManagment.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HostelManagment.API.Controllers
{
    [RoutePrefix("api/admin")]
    public class AdminController : ApiController
    {
        AdminRepository adminRepository = new AdminRepository();

        [Route("Registration")]
        [HttpPost]
        public IHttpActionResult Registration(Admins admin)
        {
            var responseMessage = adminRepository.AdminRegistration(admin);
            return Ok(responseMessage);
        }

        [Authorize]
        [Route("GetAdminUser/{adminId}")]
        [HttpGet]
        public IHttpActionResult GetAdminUser(int adminId)
        {
            var responseMessage = adminRepository.GetAdminProfile(adminId);
            return Ok(responseMessage);
        }

        [Authorize]
        [Route("UpdateProfile")]
        [HttpPost]
        public IHttpActionResult GetAdminUser(Admins admin)
        {
            var responseMessage = adminRepository.UpdateAdminProfile(admin);
            return Ok(responseMessage);
        }

    }
}
