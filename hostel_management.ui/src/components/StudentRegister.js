import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StudentService from "../services/student.service";
import { NotificationManager } from 'react-notifications';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validUserId = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid user id.
      </div>
    );
  }
};

const vuserid = (value) => {
  if (!value) 
  {
    return (
      <div className="alert alert-danger" role="alert">
        The userid should not be empty
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vgender = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Gender is required
      </div>
    );
  }
};

const vdob = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Date Of Birth Required
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


const vmobilenumber = (value) => {
  if (value.length < 10 || value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert">
        Phone Number is required
      </div>
    );
  }
};

  
const vcollegename = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          College Name is Required
        </div>
      );
    }
  };

  const vaddress = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Address is required
        </div>
      );
    }
  };

  const vidproof = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Id proof is Required
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
  

const StudentRegister = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [gender, setGender] = useState("Male");
  const [dateofbirth, setDateofbirth] = useState(new Date());
  const [email, setEmail] = useState();
  const [mobilenumber, setMobilenumber] = useState();
  const [collegename, setCollegename] = useState();
  const [address, setAddress] = useState();
  const [idproofadhar, setIdproofadhar] = useState();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const onChangeUserId = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeMobileNumber = (e) => {
    const mobilenumber = e.target.value;
    setMobilenumber(mobilenumber);
  };

  const onChangeCollegeName = (e) => {
    const collegename = e.target.value;
    setCollegename(collegename);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmpassword = e.target.value;
    setConfirmpassword(confirmpassword);
    
  };

  const onChangeIdProofAdhaar = (e) => {
    const idproofadhar = e.target.value;
    setIdproofadhar(idproofadhar);
  };

  const handleRegister = (e) => {
    
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      StudentService.apistudentregister({
        Name:name,
        Username: username,
        Gender:gender,
        DOB:dateofbirth.toLocaleDateString('en-US'),
        EmailId:email,
        MobileNo:mobilenumber,
        CollegeName:collegename,
        Address:address,
        IdProof:idproofadhar,
        Password: password
      }).then(
        (response) => {
          setMessage(response.data);
          setSuccessful(true);
          NotificationManager.success(response.data);
          window.location.reload();
        },
        (error) => {
          setMessage("Failed to Register student");
          setSuccessful(false);
          NotificationManager.warning("Failed to Register student");
        }
      );
    }
    else{
      NotificationManager.error("Error while saving data...");
    }
    
  };

  return (
    <div className="col-md-12">
      
      <div className="card">
        
      <div className="center" style={{"color":"#1C2833"}}><h3>STUDENT REGISTRATION</h3></div>
        <Form onSubmit={handleRegister} ref={form}>
          
            <div>
                <div class="row justify-content-center">
                    <div class="col-6">
                        <div className="form-group">
                            <label htmlFor="name">Full Name (with Surname)</label>
                            <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChangeUserId}
                            validations={[required, validUserId]}
                            />
                        </div>
                    </div>
                    <div class="col-6">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required, vusername]}
                            />
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-6">
              <div className="form-group">
                <label htmlFor="password">Password</label>
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
                    <div class="col-6">
              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password</label>
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
                
                
                <div className="form-group">
                
              <div class="form-row col-4">
              <div class="col-3">
                Gender:
              </div>
                <div class="col-1">
                <Input
                  type="radio"
                  name="gender"
                  checked={gender === 'Male'} 
                  value="Male" 
                  onClick={() => setGender('Male')}
                />
                </div>
                <span class="col">Male</span>
                <div class="col-1">
                <Input
                  type="radio"
                  name="gender"
                  checked={gender === 'Female'} 
                  value="Female" 
                  onClick={() => setGender('Female')}
                />
                </div>
                <span class="col">Female</span>
          
          </div>
        </div>
              <div class="row justify-content-center">
                    <div class="col-6">
                    <div className="form-group">
                        <label htmlFor="dateofbirth">Date Of Birth</label>
                        <DatePicker 
                            selected={dateofbirth}  
                            dateFormat="MM/dd/yyyy" 
                            onChange={(date)=>setDateofbirth(date)}
                            id="datepicker"
                        />
                    </div>   
                    </div>
                    <div class="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmail]}
                            />
                        </div>
                    </div>
                </div>

              <div class="row justify-content-center">
                    <div class="col-6">
                        <div className="form-group">
                            <label htmlFor="mobilenumber">Mobile Number</label>
                            <Input
                            type="text"
                            className="form-control"
                            name="mobilenumber"
                            value={mobilenumber}
                            onChange={onChangeMobileNumber}
                            validations={[required, vmobilenumber]}
                            />
                        </div>
                    </div>
                    <div class="col-6">
                    <div className="form-group">
                <label htmlFor="collegename">College Name</label>
                <Input
                  type="collegename"
                  className="form-control"
                  name="text"
                  value={collegename}
                  onChange={onChangeCollegeName}
                  validations={[required, vcollegename]}
                />
              </div>
                    </div>
              </div>
                
                
                
                <div class="row justify-content-center">
                    <div class="col-6">
                    <div className="form-group">
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAddress}
                  validations={[required,vaddress]}
                />
              </div>
                    </div>
                    <div class="col-6">
                    <div className="form-group">
                <label htmlFor="idproof">Aadhaar Number</label>
                <Input
                  type="text"
                  className="form-control"
                  name="idproof"
                  value={idproofadhar}
                  onChange={onChangeIdProofAdhaar}
                  validations={[required, vidproof]}
                />
              </div>
                    </div>
                </div>   

              
<div className="row">
    <div className="col-4"></div>
<div className="form-group col-4">
                <button className="btn btn-primary btn-block" style={{"backgroundcolor":"#34495E"}}>Register</button>
              </div>
              <div className="col-4"></div>
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
  );
};

export default StudentRegister;
