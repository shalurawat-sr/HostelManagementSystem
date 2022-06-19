import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import studentService from "../services/student.service";
import { NotificationManager } from 'react-notifications';
import NoAccess from "../NoAccess.png";

const FeeDetails = () => {
  const currentUser = AuthService.getCurrentUser();

  const [feeDetails, setFeeDetails] = useState([]);

  const handleCheckoutRoom = () => {
    var confirmResult = window.confirm("Are you sure do you want to checkout from this Room?");
    if (confirmResult) {
        studentService.CheckoutRoom(currentUser.UserId).then(
            (response) => {
                if(response.data === "There is No Room Alloted to you"){
                    NotificationManager.warning(response.data);
                }
                else{
                  window.location.reload();
                  NotificationManager.success(response.data);
                  getStudentFeeDetails();
                }
            },
            (error) => {
                NotificationManager.warning("Failed to Checkout room...");
            }
        );
    }
  }

  useEffect(()=>{
    getStudentFeeDetails();
  },[]);

  const getStudentFeeDetails = () => {
    if(currentUser){
    studentService.getRoomFeeDetails(currentUser.UserId).then(
        (response) => {
          setFeeDetails(response.data);
          console.log(response);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(resMessage);
        }
      );
    }
  }


  return (
    (currentUser) ?
    <div className="card card-small center">
      <header className="center mb-4">
        <h3>
          <strong>My Room & Fee Details</strong>
        </h3>
      </header>
      {
        
        (feeDetails.length > 0) ? 
        feeDetails.map((feeDetailsObject) => {
            return(
            <div>
                <p>
                    <strong>Room No:</strong> {feeDetailsObject.RoomNo}
                </p>
                <p>
                    <strong>Room Type:</strong> {feeDetailsObject.RoomType}
                </p>
                <p>
                    <strong>Hostel Fee: &#8377;</strong>{feeDetailsObject.Fee}/-
                </p>
                
                {/* <div class="row">
                    <div class="col-6">
                        <strong>Room No:</strong> {feeDetailsObject.RoomNo}
                    </div>
                    <div class="col-6">
                        <strong>Room Type:</strong> {feeDetailsObject.RoomType}
                    </div>
                </div> */}
                {/* <p>
                    <strong>Email:</strong> {currentUser.EmailId}
                </p> */}
                {/* <div class="row">
                    <div class="col-6">
                        <strong>Room No:</strong> {feeDetailsObject.RoomNo}
                    </div>
                    <div class="col-6">
                        <strong>Room Type:</strong> {feeDetailsObject.RoomType}
                    </div>
                </div> */}
                
            </div>
            )
        })
        :
        <div className="form-group">
            <div className="alert alert-danger" role="alert">
              You are not Alloted to any Room...
            </div>
        </div>
       }

        {
            (feeDetails.length > 0) ?
                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={false} onClick={handleCheckoutRoom}>
                        {false && (
                        <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Checkout Room</span>
                    </button>
                </div>
                : null
        }
    </div>
    :
    <img src={NoAccess}></img>
  );
};

export default FeeDetails;
