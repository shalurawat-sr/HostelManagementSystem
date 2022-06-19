import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import AuthService from "../services/auth.service";

const Menu = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };


  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <strong className="navbar-brand">HMS</strong>
        {(currentUser && currentUser.IsAdmin)
        ? 
        (
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/adminhome"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addroom"} className="nav-link">
              Add Room
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/managerooms"} className="nav-link">
              Manage Rooms
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/roomallocation"} className="nav-link">
              Allocate Room
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/studentsfeedetails"} className="nav-link">
              Fee Details
            </Link>
          </li>
        </div>
        )
        : null
        }
        {(currentUser && !currentUser.IsAdmin)
        ? 
        (
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/availablerooms"} className="nav-link">
              Available Rooms
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/feedetails"} className="nav-link">
              Fee Details
            </Link>
          </li>
        </div>
        )
        : null
        }
          
        {currentUser ? ( 
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={(currentUser.IsAdmin) ? "/adminprofile" : "/studentprofile"} className="nav-link">
                Welcome: {currentUser.Username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/adminlogin"} className="nav-link">
                Admin Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Student Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>

          </div>
        )}
      </nav>
    </div>
  );
};

export default Menu;
