import React, { useState, useRef,useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import adminService from "../services/admin.service"
import { NotificationManager } from 'react-notifications';
import AuthService from "../services/auth.service";
import NoAccess from "../NoAccess.png";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vNumber = (value) => {
    if (value <= 0) {
      return (
        <div className="alert alert-danger" role="alert">
          The number must be greater than 0.
        </div>
      );
    }
};

const AddRoom = () => {
  const currentUser = AuthService.getCurrentUser();
  const form = useRef();
  const checkBtn = useRef();

  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("");
  const [noOfBeds, setNoOfBeds] = useState("");
  const [fee, setFee] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeRoomNo = (e) => {
    setRoomNo(e.target.value);
  };

  const onChangeRoomType = (e) => {
    setRoomType(e.target.value);
  };

  const onChangeNoOfBeds = (e) => {
    setNoOfBeds(e.target.value);
  };

  const onChangeFee = (e) => {
    setFee(e.target.value);
  };

  const handleAddRoom = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if(checkBtn.current.context._errors.length === 0) {
        adminService.addRoom({
            RoomNo: roomNo,
            RoomType: roomType,
            BedsCount: noOfBeds,
            Fee: fee,
            IsActive: true
        }).then(
            (response) => {
              if(response.data ==  roomNo + " Room already exists")
              {
                NotificationManager.warning(response.data);
              }
              else{
               // window.location.reload();
                NotificationManager.success(response.data);
              }
              
              setMessage(response.data.message);
              setLoading(false);
            },
            (error) => {
              const resMessage = "Failed to Add Room...";
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

  useEffect(()=>{
    if(currentUser){
      adminService.getMaxRoomNumber().then(
        (response)=>{
          setRoomNo(response.data);
          console.log(response);
        },
        (error)=>{
          const resMessage=
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(resMessage);
        }
      );
    }
  },[]);
  return (
    (currentUser) ?
    <div className="col-md-12">
      <div style={{"textAlign":"center","color":"#1C2833"}}><h4>ADD ROOM</h4></div>
      <div className="card card-small">
        <Form onSubmit={handleAddRoom} ref={form}>
          <div className="form-group">
            <label htmlFor="roomNo">Room No</label>
            <Input
              type="number"
              className="form-control"
              name="roomNo"
              value={roomNo}
              onChange={onChangeRoomNo}
              validations={[required, vNumber]}
              placeholder={"Please Enter Room No"}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomType">Room Type</label>
            <Select className="form-control" name='roomType' value={roomType} onChange={onChangeRoomType} validations={[required]}>
                <option value=''>Choose Room Type</option>
                <option value='NON-AC'>NON-AC</option>
                <option value='AC'>AC</option>
            </Select>
          </div>

          <div className="form-group">
            <label htmlFor="noOfBeds">No of Beds</label>
            <Input
              type="number"
              className="form-control"
              name="noOfBeds"
              value={noOfBeds}
              onChange={onChangeNoOfBeds}
              validations={[required, vNumber]}
              placeholder={"Please Enter Number"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fee">Fee</label>
            <Input
              type="number"
              className="form-control"
              name="fee"
              value={fee}
              onChange={onChangeFee}
              validations={[required, vNumber]}
              placeholder={"Please Enter Amount"}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading} style={{"backgroundcolor":"#34495E"}}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Add Room</span>
            </button>
          </div>

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

export default AddRoom;
