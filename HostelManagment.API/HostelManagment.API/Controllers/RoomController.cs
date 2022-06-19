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
    [Authorize]
    [RoutePrefix("api/Room")]
    public class RoomController : ApiController
    {
        RoomRepository roomRepository = new RoomRepository();

        [Route("getAllRooms")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            var responseMessage = roomRepository.GetAllRooms();
            return Ok(responseMessage);
        }

        [Route("CreateRoom")]
        [HttpPost]
        public IHttpActionResult CreateRoom(Rooms room)
        {
            var responseMessage = roomRepository.AddNewRoom(room);
            return Ok(responseMessage);
        }

        [Route("ActivateDeactivateRoom")]
        [HttpPost]
        public IHttpActionResult RoomStatusUpdate(Rooms room)
        {
            var responseMessage = roomRepository.ActivateOrDeactivateRoom(room);
            return Ok(responseMessage);
        }

        [Route("getAvailableRoomsForCheckin")]
        [HttpGet]
        public IHttpActionResult GetAvailableRooms()
        {
            var responseMessage = roomRepository.GetAvailableRooms();
            return Ok(responseMessage);
        }

        [Route("getMaxRoomNo")]
        [HttpGet]
        public IHttpActionResult GetMaxRoomNumber()
        {
            var responseMessage = roomRepository.GetMaxRoomNumber();
            return Ok(responseMessage);
        }

    }
}
