import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import adminService from "../services/admin.service"
import { NotificationManager } from 'react-notifications';
import AuthService from "../services/auth.service";
import NoAccess from "../NoAccess.png";

const ManageRooms = () => {
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();
  const [rooms, setRooms] = useState([]);
  const [roomStatus, setRoomStatus] = useState("Activate");
  const [roomId, setRoomId] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    if(currentUser){
      adminService.getAllRooms().then(
        (response) => {
          setRooms(response.data);
        },
        (error) => {
          NotificationManager.error("Failed to fetch Rooms...");
        }
      );
    }
  },[]);

  const setDefaults = () => {
    setRoomId(0);
    setRoomStatus("Activate");
  }

  const onChangeRoomNo = (e) => {
    setRoomId(e.target.value);
  };


  const handleSave = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();
    if(checkBtn.current.context._errors.length === 0) {
      adminService.activateOrDeactivateRoom({
          Id: roomId,
          IsActive: roomStatus === "Activate" ? true : false
      }).then(
          (response) => {
            if(response.data === "Room Status Updated..."){
              NotificationManager.success(response.data);
              window.location.reload();
            }
            else{
              NotificationManager.warning(response.data);
            }
            
            setMessage(response.data.message);
            setLoading(false);
            setDefaults();
          },
          (error) => {
            const resMessage = "Failed to update Room status...";
            NotificationManager.error(resMessage);
            setMessage(resMessage);
            setLoading(false);
          }
      );
    }
    else{
      NotificationManager.error("Error while saving data...");
    }
  }

  return (
    (currentUser) ?
    <div className="col-md-12">
    <div style={{"textAlign":"center" ,"color":"#1C2833"}}><h4>MANAGE ROOMS</h4></div>
      <div className="card card-small">

        <Form onSubmit={handleSave} ref={form}>
        {!loading && (

          <div className="form-group">
            <label htmlFor="roomNo">Room No</label>
            <Select className="form-control" name='roomNo' value={roomId} 
            onChange={onChangeRoomNo}>
                <option value=''>Choose Room No</option>
                {
                    (rooms) ?
                    rooms.map(room =>
                        <option key={room.Id} value={room.Id}>{room.RoomNo}</option>
                    )
                    :
                    null
                }
            </Select>

            <div className="form-group mt-2">
              <div class="form-row">
                <div class="col-1">
                <Input
                  type="radio"
                  name="roomStatus"
                  checked={roomStatus === 'Activate'} 
                  value="Activate" 
                  onClick={() => setRoomStatus('Activate')}
                />
                </div>
                <span class="col">Activate</span>
                <div class="col-1">
                <Input
                  type="radio"
                  name="roomStatus"
                  checked={roomStatus === 'Deactivate'} 
                  value="Deactivate" 
                  onClick={() => setRoomStatus('Deactivate')}
                />
                </div>
                <span class="col">Deactivate</span>
          </div>
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading} style={{"backgroundcolor":"#34495E"}}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Save</span>
            </button>
          </div>

          </div>
          )}

          
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    :
    <img src={NoAccess}></img>
  );
};

export default ManageRooms;
