using HostelManagment.Models.DBModels;
using HostelManagment.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Data.Repository
{
    public class StudentRepository
    {
        private HMContext _hmbContext = new HMContext();

        public IEnumerable<Students> GetAllStudents()
        {
            return _hmbContext.Students.ToList();
        }

        public string StudentRegistration(Students student)
        {
            string responseMessage = null;
            var get_user = _hmbContext.Students.FirstOrDefault(s => s.Username == student.Username);
            if (get_user == null)
            {
                _hmbContext.Students.Add(student);
                _hmbContext.SaveChanges();
            }
            else
            {
                responseMessage = "UserName already exists" + student.Username;
            }
            responseMessage = "Successfully Registered Student: " + student.Name;
            return responseMessage;
        }

        public string DeleteStudents(int[] studentIds)
        {
            string responseMessage = null;

            foreach (var studentId in studentIds)
            {
                var student_Record = _hmbContext.Students.FirstOrDefault(s => s.Id == studentId);
                if (student_Record != null)
                {
                    _hmbContext.Students.Remove(student_Record);
                    _hmbContext.SaveChanges();
                }
            };
            
            responseMessage = "Successfully Deleted...";
            return responseMessage;
        }

        public IEnumerable<StudentsFeeDetails> GetFeeDetailsOfAllStudents()
        {
            var studentsFeeDetails = from ralctn in _hmbContext.RoomAllocation
                      join rms in _hmbContext.Rooms on ralctn.RoomId equals rms.Id
                      join studts in _hmbContext.Students on ralctn.StudentId equals studts.Id
                      select new StudentsFeeDetails
                      {
                          StudentId = studts.Id,
                          StudentName = studts.Name,
                          CollegeName = studts.CollegeName,
                          EmailId = studts.EmailId,
                          IdProof = studts.IdProof,
                          Fee = rms.Fee,
                          RoomNo = rms.RoomNo,
                          RoomType = rms.RoomType,
                          IsActive = rms.IsActive,
                          IsCheckout = ralctn.IsCheckout
                      };
            return studentsFeeDetails;
        }

        public string StudentRoomAllocation(int roomId, int studentId)
        {
            string responseMessage = null;
            int availableBedsOfRoom = GetAvailableBeds(roomId);
            if (availableBedsOfRoom == -1)
            {
                responseMessage = "Room is not in Active state";
                return responseMessage;
            }
            if (availableBedsOfRoom > 0)
            {
                var get_Student = _hmbContext.RoomAllocation.FirstOrDefault(s => s.StudentId == studentId && s.IsCheckout == false);
                if (get_Student == null)
                {
                    RoomAllocation roomAllocation = new RoomAllocation
                    {
                        RoomId = roomId,
                        StudentId = studentId,
                        IsCheckout = false
                    };
                    _hmbContext.RoomAllocation.Add(roomAllocation);
                    _hmbContext.SaveChanges();
                    AllotedBedsCountUpdate(roomId, 1);
                    responseMessage = "Room Alloted";
                    return responseMessage;
                }
                else
                {
                    responseMessage = "Already room alloted to this Student";
                }
            }
            else
            {
                responseMessage = "Beds are not available in this Room";
            }
            
            return responseMessage;
        }

        private void AllotedBedsCountUpdate(int roomId, int increaseOrDecreaseCount)
        {
            var get_RoomObj = _hmbContext.Rooms.FirstOrDefault(a => a.Id == roomId && a.IsActive == true);

            if (get_RoomObj != null)
            {
                get_RoomObj.AllotedBedsCount = get_RoomObj.AllotedBedsCount + increaseOrDecreaseCount;
                _hmbContext.SaveChanges();
            }
        }

        private int GetAvailableBeds(int roomId)
        {
            var get_RoomObj = _hmbContext.Rooms.FirstOrDefault(a => a.Id == roomId && a.IsActive == true);

            int availableBeds = -1;

            if (get_RoomObj != null)
            {
                availableBeds = get_RoomObj.BedsCount - get_RoomObj.AllotedBedsCount;
            }
            return availableBeds;
        }

        public string CheckoutStudent(int studentId)
        {
            string responseMessage = null;
            var get_RoomObj = _hmbContext.RoomAllocation.FirstOrDefault(a => a.StudentId == studentId && a.IsCheckout == false);

            if (get_RoomObj != null)
            {
                get_RoomObj.IsCheckout = true;
                _hmbContext.SaveChanges();
                AllotedBedsCountUpdate(get_RoomObj.RoomId, -1);
                responseMessage = "You are checked out from Hostel...";
            }
            else
            {
                responseMessage = "There is No Room Alloted to you";
            }
            return responseMessage;
        }

        public Students GetStudentProfile(int studentId)
        {
            var get_user = _hmbContext.Students.FirstOrDefault(a => a.Id == studentId);
            return get_user;
        }

        public string UpdateStudentProfile(Students student)
        {
            string responseMessage = null;
            var get_UserObj = _hmbContext.Students.FirstOrDefault(a => a.Id == student.Id);

            if (get_UserObj != null)
            {
                get_UserObj.Name = student.Name;
                get_UserObj.DOB = student.DOB;
                get_UserObj.Gender = student.Gender;
                get_UserObj.EmailId = student.EmailId;
                get_UserObj.MobileNo = student.MobileNo;
                get_UserObj.CollegeName = student.CollegeName;
                get_UserObj.Address = student.Address;
                get_UserObj.IdProof = student.IdProof;
                get_UserObj.Password = student.Password;
                _hmbContext.SaveChanges();
                responseMessage = "Updated Profile Successfully...";
            }
            else
            {
                responseMessage = "There is No Student Found with this username";
            }
            return responseMessage;
        }
    }
}
