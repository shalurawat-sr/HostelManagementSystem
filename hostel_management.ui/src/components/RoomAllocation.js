import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import adminService from "../services/admin.service";
import studentService from "../services/student.service";
import { NotificationManager } from 'react-notifications';
import AuthService from "../services/auth.service";
import NoAccess from "../NoAccess.png";

const RoomAllocation = () => {
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();

  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [roomId, setRoomId] = useState();
  const [studentId, setStudentId] = useState();

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

        studentService.getAllStudents().then(
            (response) => {
              setStudents(response.data);
            },
            (error) => {
              NotificationManager.error("Failed to fetch Students...");
            }
          );
    }
  },[]);

  const onChangeRoomNo = (e) => {
    setRoomId(e.target.value);
  };

  const onChangeStudent = (e) => {
    setStudentId(e.target.value);
  };


  const handleSave = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      studentService.studentRoomAllocation(roomId, studentId)
      .then(
          (response) => {
            if(response.data === "Room Alloted"){
              NotificationManager.success(response.data);
            }
            else{
              NotificationManager.warning(response.data);
            }
            
            setMessage(response.data);
            setLoading(false);
            window.location.reload();
          },
          (error) => {
            const resMessage = "Failed to Allocate Room...";
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
    <div className="center" style={{"color":"#1C2833"}}><h4>STUDENT ROOM ALLOCATION</h4></div>
      <div className="card card-small">

        <Form onSubmit={handleSave} ref={form}>
        

          <div className="form-group">
            <label htmlFor="roomNo">Select Room No</label>
            <Select className="form-control" name='roomNo' value={roomId} 
            onChange={onChangeRoomNo}>
                <option value=''>Choose Room No</option>
                {
                    (rooms) ?
                    rooms.map(room =>
                        <option key={room.Id} value={room.Id}>{room.RoomNo} - ({room.RoomType})</option>
                    )
                    :
                    null
                }
            </Select>

            <label htmlFor="roomNo">Select Student</label>
            <Select className="form-control" name='roomNo' value={studentId} 
            onChange={onChangeStudent}>
                <option value=''>Choose Student With AadharNo</option>
                {
                    (students) ?
                    students.map(student =>
                        <option key={student.Id} value={student.Id}>{student.Name + "-(" + student.IdProof + ")"}</option>
                    )
                    :
                    null
                }
            </Select>
          </div>
          
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading} style={{"backgroundcolor":"#34495E"}}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Allocate Room</span>
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

export default RoomAllocation;
