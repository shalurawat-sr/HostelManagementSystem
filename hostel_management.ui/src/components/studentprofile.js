import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { NotificationManager } from 'react-notifications';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AuthService from "../services/auth.service";
import StudentService from "../services/student.service";
import NoAccess from "../NoAccess.png";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};



const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vConfirmPassword = (passwords) => {
  if(passwords.password != passwords.confirmPassword){
    return (
      <div className="alert alert-danger" role="alert">
        Password should match
      </div>
    )
  }
};

const vmobilenumber = (value) => {
  if (value.length < 10 || value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert">
        Phone Number is required
      </div>
    );
  }
};

const StudentRegister = () => {
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();

  const [studentProfile, setStudentProfile] = useState();
  
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [dateofbirth, setDateofbirth] = useState(new Date());
  

  const [isEdit, setIsEdit] = useState(false);

  useEffect(()=>{
    if(currentUser){
      StudentService.getStudentProfileById(currentUser.UserId).then(
        (response) => {
            console.log(response.data);
            setStudentProfile(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  },[]);

  // useEffect(()=>{
  //   if(studentProfile){
  //     let studentProfileObject = studentProfile;
  //     studentProfileObject.DOB = dateofbirth;
  //     setStudentProfile(studentProfileObject);
  //   }
  // },[dateofbirth]);

  const onChangeName = (e) => {
    const name = e.target.value;
    let studentProfileObject = studentProfile;
    studentProfileObject.Name = name;
    setStudentProfile(studentProfileObject);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    let studentProfileObject = studentProfile;
    studentProfileObject.EmailId = email;
    setStudentProfile(studentProfileObject);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    let studentProfileObject = studentProfile;
    studentProfileObject.Password = password;
    setPassword(password);
    setStudentProfile(studentProfileObject);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmpassword = e.target.value;
    setConfirmpassword(confirmpassword);

  };

  const onChangeMobileNumber = (e) => {
    const mobilenumber = e.target.value;
    let studentProfileObject = studentProfile;
    studentProfileObject.MobileNo = mobilenumber;
    setStudentProfile(studentProfileObject);
  };

  const onChangeCollegeName = (e) => {
    const collegename = e.target.value;
    let studentProfileObject = studentProfile;
    studentProfileObject.CollegeName = collegename;
    setStudentProfile(studentProfileObject);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    let studentProfileObject = studentProfile;
    studentProfileObject.Address = address;
    setStudentProfile(studentProfileObject);
  };

  const onChangeIdProofAdhaar = (e) => {
    const idproofadhar = e.target.value;
    let studentProfileObject = studentProfile;
    studentProfileObject.IdProof = idproofadhar;
    setStudentProfile(studentProfileObject);
  };

  const onChangeGender = (selectdGender) => {
    let studentProfileObject = studentProfile;
    studentProfileObject.Gender = selectdGender;
    setStudentProfile(studentProfileObject);
  }

  const onChangeDob = (selectedvalue) => {
    let dateValue = selectedvalue.toLocaleDateString('en-US')
    let studentProfileObject = studentProfile;
    studentProfileObject.DOB = dateValue;
    setStudentProfile(studentProfileObject);
    setDateofbirth(dateValue);
  }


  const handleRegister = (e) => {
    e.preventDefault();

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        StudentService.updateStudentProfile(studentProfile).then(
            (response) => {
              window.location.reload();
              NotificationManager.success(response.data);
            },
            (error) => {
              NotificationManager.error("Failed to Update Student Profile...");
            }
          );
    }
  };

  const handleOnEditClick = () => {
    setIsEdit(true);
  }

  const handleCancel = () => {
    setIsEdit(false);
  }




  return (
    (currentUser && studentProfile) ?
    <div className="col-md-12">
      <div className="center" style={{"color":"#1C2833"}}><h3>PROFILE</h3></div>
      <div className="card">

        <Form onSubmit={handleRegister} ref={form}>

            <div>
              <div className="row">
                <div className="col-6">
                    <div class="row justify-content-center">
                      <div class="col-4">
                          <div className="form-group">
                            <strong>Username:</strong>
                          </div>
                      </div>
                      <div class="col-8">
                          <div className="form-group">
                            {currentUser.Username}
                          </div>
                      </div>
                    </div>
                </div>
                
              </div>
              <div className="row">
                <div className="col-6">
                    <div class="row justify-content-center">
                      <div class="col-4">
                          <div className="form-group">
                            <strong>Full Name (with Surname)</strong>
                          </div>
                      </div>
                      <div class="col-8">
                          <div className="form-group">
                              {
                                (isEdit) ?
                                  <Input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  value={studentProfile.Name}
                                  onChange={onChangeName}
                                  validations={[required]}
                                  />
                                :
                                  studentProfile.Name
                              }

                          </div>
                      </div>
                    </div>
                </div>
                <div className="col-6">
                    <div class="row justify-content-center">
                      <div class="col-12">
                      <div className="form-group">
                        <div class="form-row col-8">
                            <div class="col-3">
                              <strong>Gender:</strong>
                            </div>
                            <div class="col-1">
                              <Input
                              type="radio"
                              name="gender"
                              checked={studentProfile.Gender === 'Male'}
                              value={"Male"}
                              onClick={() => onChangeGender('Male')}
                              disabled = {(isEdit) ? false : true}
                              />
                            </div>
                            <span class="col">Male</span>
                            <div class="col-1">
                              <Input
                              type="radio"
                              name="gender"
                              checked={studentProfile.Gender === 'Female'}
                              value={"Female"}
                              onClick={() => onChangeGender('Female')}
                              disabled = {(isEdit) ? false : true}
                              />
                            </div>
                            <span class="col">Female</span>
                        </div>
                      </div>
                      </div>
                    </div>
                </div>
              </div>
              {
                (isEdit) ?
                  <div className="row">
                  <div className="col-6">
                      <div class="row justify-content-center">
                        <div class="col-4">
                            <div className="form-group">
                              <strong>Password:</strong>
                            </div>
                        </div>
                        <div class="col-8">
                            <div className="form-group">
                              <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                id={"idPassword"}
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                              />
                            </div>
                        </div>
                      </div>
                  </div>
                  <div className="col-6">
                      <div class="row justify-content-center">
                        <div class="col-4">
                            <div className="form-group">
                              <strong>Confirm Password:</strong>
                            </div>
                        </div>
                        <div class="col-8">
                            <div className="form-group">
                              <Input
                                type="password"
                                className="form-control"
                                name="confirmpassword"
                                value={confirmpassword}
                                onChange={onChangeConfirmPassword}
                                validations={[required, vpassword, (val) => vConfirmPassword({"confirmPassword":val,"password":document.getElementById("idPassword").value})]}
                              />
                            </div>
                        </div>
                      </div>
                  </div>
                  </div>
                :
                  null
              }

              <div className="row">
                <div className="col-6">
                    <div class="row justify-content-center">
                      <div class="col-4">
                          <div className="form-group">
                            <strong>Date Of Birth:</strong>
                          </div>
                      </div>
                      <div class="col-8">
                          <div className="form-group">
                            {(isEdit) ?
                            <DatePicker
                            selected={new Date(studentProfile.DOB)}
                            dateFormat="MM/dd/yyyy"
                            //onChange={(date)=>setDateofbirth(date)}
                            onChange={(date)=>onChangeDob(date)}
                            id="datepicker"
                            />
                            :
                            //studentProfile.DOB.toLocaleDateString('en-US')}
                            studentProfile.DOB}
                          </div>
                      </div>
                    </div>
                </div>
                <div className="col-6">
                    <div class="row justify-content-center">
                      <div class="col-4">
                          <div className="form-group">
                            <strong>Email:</strong>
                          </div>
                      </div>
                      <div class="col-8">
                          <div className="form-group">
                            {(isEdit) ?
                              <Input
                              type="text"
                              className="form-control"
                              name="email"
                              value={studentProfile.EmailId}
                              onChange={onChangeEmail}
                              validations={[required, validEmail]}
                              />
                            :
                            studentProfile.EmailId}
                          </div>
                      </div>
                    </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                    <div class="row justify-content-center">
                      <div class="col-4">
                          <div className="form-group">
                            <strong>Mobile Number:</strong>
                          </div>
                      </div>
                      <div class="col-8">
                          <div className="form-group">
                            {(isEdit) ?
                              <Input
                              type="text"
                              className="form-control"
                              name="mobilenumber"
                              value={studentProfile.MobileNo}
                              onChange={onChangeMobileNumber}
                              validations={[required, vmobilenumber]}
                              />
                            :
                            studentProfile.MobileNo}
                          </div>
                      </div>
                    </div>
                </div>
                <div className="col-6">
                    <div class="row justify-content-center">
                      <div class="col-4">
                          <div className="form-group">
                            <strong>College Name:</strong>
                          </div>
                      </div>
                      <div class="col-8">
                          <div className="form-group">
                            {(isEdit) ?
                              <Input
                              type="collegename"
                              className="form-control"
                              name="text"
                              value={studentProfile.CollegeName}
                              onChange={onChangeCollegeName}
                              validations={[required]}
                            />
                            :
                            studentProfile.CollegeName}
                          </div>
                      </div>
                    </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                    <div class="row justify-content-center">
                      <div class="col-4">
                          <div className="form-group">
                            <strong>Address:</strong>
                          </div>
                      </div>
                      <div class="col-8">
                          <div className="form-group">
                            {(isEdit) ?
                              <Input
                              type="text"
                              className="form-control"
                              name="address"
                              value={studentProfile.Address}
                              onChange={onChangeAddress}
                              validations={[required]}
                            />
                            :
                            studentProfile.Address}
                          </div>
                      </div>
                    </div>
                </div>
                <div className="col-6">
                    <div class="row justify-content-center">
                      <div class="col-4">
                          <div className="form-group">
                            <strong>Aadhar Number:</strong>
                          </div>
                      </div>
                      <div class="col-8">
                          <div className="form-group">
                            {(isEdit) ?
                              <Input
                              type="text"
                              className="form-control"
                              name="idproof"
                              value={studentProfile.IdProof}
                              onChange={onChangeIdProofAdhaar}
                              validations={[required]}
                            />
                            :
                            studentProfile.IdProof}
                          </div>
                      </div>
                    </div>
                </div>
              </div>


              <div className="row justify-content-center">
              {
                (isEdit) ?
                <>
                <div className="mt-2 col-6">
                    <button className="btn btn-primary btn-block" style={{"backgroundcolor":"#34495E"}}>Update</button>
                </div>
                <div className="mt-2 col-6">
                    <button onClick={handleCancel} className="btn btn-primary btn-block" style={{"backgroundcolor":"#34495E"}}>Cancel</button>
                </div>
                </>
                :
                <div class="mt-2">
                    <button onClick={handleOnEditClick} className="btn btn-primary btn-block" style={{"backgroundcolor":"#34495E"}}>Edit</button>
                </div>
              }
              </div>
            </div>


          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
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

export default StudentRegister;
