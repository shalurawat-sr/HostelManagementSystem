import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import studentService from "../services/student.service";
import AuthService from "../services/auth.service";
import NoAccess from "../NoAccess.png";

const AvailableRooms = () => {
  const currentUser = AuthService.getCurrentUser();
  const [availableRooms, setAvailableRooms] = useState([]);
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  useEffect(()=>{
    if(currentUser){
      studentService.getAvaialableRoomsForCheckin().then(
        (response) => {
          setAvailableRooms(response.data);
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
  },[]);


  const columns = [
    {
     name: "RoomNo",
     label: "Room No",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
      name: "RoomType",
      label: "Room Type",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "AvailableBeds",
      label: "Available Beds",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
        name: "Fee",
        label: "Fee Per Bed",
        options: {
          filter: false,
          sort: true,
        }
      }
   ];
   

   const options = {
      selectableRows: false,
   };

  return (
    (currentUser) ?
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Rooms Availability"}
          data={availableRooms}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    :
    <img src={NoAccess}></img>
  );
};

export default AvailableRooms;
