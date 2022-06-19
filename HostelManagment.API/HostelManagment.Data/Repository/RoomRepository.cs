using HostelManagment.Models.DBModels;
using HostelManagment.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostelManagment.Data.Repository
{
    public class RoomRepository
    {
        private HMContext _hmbContext = new HMContext();

        public IEnumerable<Rooms> GetAllRooms()
        {
            return _hmbContext.Rooms.ToList();
        }

        public string AddNewRoom(Rooms room)
        {
            string responseMessage = null;
            var get_Room = _hmbContext.Rooms.FirstOrDefault(a => a.RoomNo == room.RoomNo);
            if (get_Room == null)
            {
                _hmbContext.Rooms.Add(room);
                _hmbContext.SaveChanges();
                responseMessage = "Successfully Created Room No: " + room.RoomNo;
            }
            else
            {
                responseMessage = room.RoomNo + " Room already exists";
            }
            
            return responseMessage;
        }
        public string ActivateOrDeactivateRoom(Rooms room)
        {
            string responseMessage = null;
            var get_RoomObj = _hmbContext.Rooms.FirstOrDefault(a => a.Id == room.Id);

            if (get_RoomObj != null)
            {
                get_RoomObj.IsActive = room.IsActive;
                _hmbContext.SaveChanges();
                responseMessage = "Room Status Updated...";
                if (room.IsActive == false)
                {
                    CheckoutStudentFromDeactivingRoom(room.Id);
                }
            }
            else
            {
                responseMessage = "There is No Room with Room No: " + room.RoomNo;
            }
            return responseMessage;
        }
        public string CheckoutStudentFromDeactivingRoom(int roomId)
        {
            string responseMessage = null;
            var roomAllctnList = _hmbContext.RoomAllocation.Where(a => a.RoomId == roomId).ToList();

            if (roomAllctnList.Count > 0)
            {
                roomAllctnList.ForEach(a => a.IsCheckout = true);
                _hmbContext.SaveChanges();
                AllotedBedsCountUpdate(roomId);
            }
            return responseMessage;
        }
        private void AllotedBedsCountUpdate(int roomId)
        {
            var get_RoomObj = _hmbContext.Rooms.FirstOrDefault(a => a.Id == roomId);

            if (get_RoomObj != null)
            {
                get_RoomObj.AllotedBedsCount = 0;
                _hmbContext.SaveChanges();
            }
        }

        public IEnumerable<AvailableRooms> GetAvailableRooms()
        {
            var availableRooms = from room in _hmbContext.Rooms.Where(a => a.IsActive == true && (a.BedsCount - a.AllotedBedsCount) > 0)
                                                                select new AvailableRooms 
                                                                {
                                                                    Id = room.Id,
                                                                    RoomNo = room.RoomNo,
                                                                    RoomType = room.RoomType,
                                                                    Fee = room.Fee,
                                                                    AllotedBedsCount = room.AllotedBedsCount,
                                                                    BedsCount = room.BedsCount,
                                                                    IsActive = room.IsActive,
                                                                    AvailableBeds = room.BedsCount - room.AllotedBedsCount
                                                                };
            return availableRooms.ToList();
        }

        public int GetMaxRoomNumber()
        {
            Rooms maxRoomNoRoom = _hmbContext.Rooms.OrderByDescending(r => r.RoomNo).FirstOrDefault();
            if(maxRoomNoRoom!=null)
            {
                return maxRoomNoRoom.RoomNo + 1;
            }
            else
            {
                return 100;
            }
        }
    }
}
