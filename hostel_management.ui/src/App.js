import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-notifications/lib/notifications.css';
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import About from "./components/About";
import Home from "./components/Home";
import StudentsFeeDetails from "./components/StudentsFeeDetails";
import AddRoom from "./components/AddRoom";
import ManageRooms from "./components/ManageRooms";
import RoomAllocation from "./components/RoomAllocation";
import AvailableRooms from "./components/AvailableRooms";
import FeeDetails from "./components/FeeDetails";
import StudentRegister from "./components/StudentRegister";
import AdminProfile from "./components/adminProfile";
import Studentprofile from "./components/studentprofile";
import Menu from "./components/Menu";
import AdminRegister from "./components/AdminRegister";

const App = () => {
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
      <Menu/>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/adminlogin" component={AdminLogin} />
          <Route path="/adminhome" component={Home} />
          <Route exact path="/ar-r" component={AdminRegister}/>
          <Route exact path="/studentsfeedetails" component={StudentsFeeDetails} />
          <Route exact path="/addroom" component={AddRoom} />
          <Route exact path="/managerooms" component={ManageRooms} />
          <Route exact path="/roomallocation" component={RoomAllocation} />
          <Route exact path="/availablerooms" component={AvailableRooms} />
          <Route exact path="/feedetails" component={FeeDetails} />
          <Route exact path="/studentregister" component={StudentRegister}/>
          <Route exact path="/adminprofile" component={AdminProfile}/>
          <Route exact path="/studentprofile" component={Studentprofile}/>
          <Route exact path="/about" component={About}/>
        </Switch>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default App;
