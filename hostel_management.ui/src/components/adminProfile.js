import React, {useState, useEffect, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import AdminService from "../services/admin.service";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import adminService from "../services/admin.service";
import { NotificationManager } from 'react-notifications';
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

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
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
  

const AdminProfile = () => {
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();

  const [adminProfile, setAdminProfile] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  useEffect(()=>{
    if(currentUser) {
      AdminService.getAdminProfileById(currentUser.UserId).then(
        (response) => {
            console.log(response.data);
          setAdminProfile(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  },[]);

  const onChangeName = (e) => {
    const name = e.target.value;
    let adminProfileObject = adminProfile;
    adminProfileObject.Name = name;
    setAdminProfile(adminProfileObject);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    let adminProfileObject = adminProfile;
    adminProfileObject.EmailId = email;
    setAdminProfile(adminProfileObject);
  };

  const handleRegister = (e) => {
    
    e.preventDefault();

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        adminService.updateAdminProfile(adminProfile).then(
            (response) => {
              window.location.reload();
              NotificationManager.success(response.data);
            },
            (error) => {
              NotificationManager.error("Failed to Update Admin Profile...");
            }
          );
    }

    
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmpassword = e.target.value;
    setConfirmpassword(confirmpassword);
    
  };

  const handleOnEditClick = () => {
      setIsEdit(true);
  }

  const handleCancel = () => {
    setIsEdit(false);
}

  return (
      (currentUser && adminProfile) ?
    <div className="container">
      <div className="center" style={{"color":"#1C2833"}}><h3>PROFILE</h3></div>
      <Form onSubmit={handleRegister} ref={form}>
        <div className="container card card-small">

        <div class="row justify-content-center">
            <div class="col-4">
                <div className="form-group">
                    <strong>Username:</strong>
                </div>
            </div>
            <div class="col-8">
                <div className="form-group">
                {adminProfile.Username}
                    {/* {(isEdit) ?
                        <Input
                        type="text"
                        className="form-control ml-2"
                        name="username"
                        value={adminProfile.Username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                        />
                        : 
                        adminProfile.Username} */}
                </div>
            </div>
        </div>
        
        <div class="row justify-content-center">
            <div class="col-4">
                <div className="form-group">
                    <strong>Name:</strong>
                </div>
            </div>
            <div class="col-8">
                <div className="form-group">
                    {(isEdit) ?
                        <Input
                        type="text"
                        className="form-control ml-2"
                        name="username"
                        value={adminProfile.Name}
                        onChange={onChangeName}
                        validations={[required, vusername]}
                        />
                    : 
                        adminProfile.Name}
                </div>
            </div>
        </div>

        

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
                        className="form-control ml-2"
                        name="email"
                        value={adminProfile.EmailId}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                        />
                        : 
                        adminProfile.EmailId}
                </div>
            </div>
        </div>

        {(isEdit) ?
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
        :
        null}

        {(isEdit) ?
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
        :
        null}

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
      <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    
      
      {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
    : <img src={NoAccess}></img>
  );
};

export default AdminProfile;
