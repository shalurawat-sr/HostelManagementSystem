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
    [RoutePrefix("api/Students")]
    public class StudentController : ApiController
    {
        StudentRepository studentRepository = new StudentRepository();

        [Route("Registration")]
        [HttpPost]
        public IHttpActionResult Registration(Students student)
        {
            var responseMessage = studentRepository.StudentRegistration(student);
            return Ok(responseMessage);
        }

        [Authorize]
        [Route("GetAllStudents")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            var student = studentRepository.GetAllStudents();
            return Ok(student);
        }

        [Authorize]
        [Route("DeleteStudents")]
        [HttpPost]
        public IHttpActionResult DeleteStudents(int[] studentIds)
        {
            var response = studentRepository.DeleteStudents(studentIds);
            return Ok(response);
        }

        [Authorize]
        [Route("GetFeeDetailsOfAllStudents")]
        [HttpGet]
        public IHttpActionResult GetStudentsFeeDetails()
        {
            var response = studentRepository.GetFeeDetailsOfAllStudents();
            return Ok(response);
        }

        [Authorize]
        [Route("StudentRoomAllocation/{roomId}/{studentId}")]
        [HttpGet]
        public IHttpActionResult AssignRoomToStudent(int roomId, int studentId)
        {
            var response = studentRepository.StudentRoomAllocation(roomId, studentId);
            return Ok(response);
        }

        [Authorize]
        [Route("GetFeeDetailsOfStudent/{studentId}")]
        [HttpGet]
        public IHttpActionResult GetStudentFeeDetailsById(int studentId)
        {
            var response = studentRepository.GetFeeDetailsOfAllStudents().Where(st => st.StudentId == studentId && st.IsActive == true && st.IsCheckout == false);
            return Ok(response);
        }

        [Authorize]
        [Route("CheckoutRoom/{studentId}")]
        [HttpGet]
        public IHttpActionResult CheckoutRoom(int studentId)
        {
            var response = studentRepository.CheckoutStudent(studentId);
            return Ok(response);
        }

        [Authorize]
        [Route("GetStudentUser/{studentId}")]
        [HttpGet]
        public IHttpActionResult GetStudentUser(int studentId)
        {
            var responseMessage = studentRepository.GetStudentProfile(studentId);
            return Ok(responseMessage);
        }

        [Authorize]
        [Route("UpdateStudentProfile")]
        [HttpPost]
        public IHttpActionResult UpdateStudentProfile(Students student)
        {
            var responseMessage = studentRepository.UpdateStudentProfile(student);
            return Ok(responseMessage);
        }
    }
}
