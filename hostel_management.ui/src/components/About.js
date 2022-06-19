import React from "react";
//import About from './About';
export default class About extends React.Component{
    render(){
        return(
            <div class="card mt-5" style={{"background-color":"#FFFFFF"}}>
                <h1 class="mt-3" style={{"color":"#34495E","text-align":"center"}}>ABOUT</h1>
                <div class="row mt-3">
                    <div class="col-lg-50" style={{"background-color":"#FFFFFF"}}>
                    <p style={{"color":"#34495E","text-align":"justify","text-justify":"inter-word","padding":"0px 8px","font-style":"italic"}}>The “Hostel Management System” is web application which is developed for managing various activities in the hostel. This application useful to avoid the manual data entry and is easy to access the data about the hostel. There is a lot of strain on the person who are running the hostel and software’s are not usually used in this context. Hostel Management System is a customize and user-friendly web application for hostel which provide hostel information, such as availability of rooms, details of registered students etc. This helps the admin to manage rooms and students records etc.</p>
                    <p style={{"color":"#34495E","text-align":"justify","text-justify":"inter-word","padding":"8px 8px","font-style":"italic"}}>We try to solve the problem of student.This site is just awesome. You wil get every thing just perfect,support liveliness. This is an excellent hostel and sets a standard which is difficult for other establishments to compete with. A platform which shows all the avaliable rooms in hostels in our website. Basically our platform will help to provide the better functionalities of hostels.</p>
                    </div>
                </div>
            </div>
        );
    }
 }
