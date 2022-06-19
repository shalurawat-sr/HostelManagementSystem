import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import adminService from "../services/admin.service";
import AuthService from "../services/auth.service";
import NoAccess from "../NoAccess.png";

const StudentsFeeDetails = () => {
  const currentUser = AuthService.getCurrentUser();
  const [studentsFeeDetails, setstudentsFeeDetails] = useState([]);
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  useEffect(()=>{
    if(currentUser){
      adminService.getAllStudentsFeeDetails().then(
        (response) => {
          setstudentsFeeDetails(response.data);
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
     name: "StudentName",
     label: "Student Name",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
      name: "IdProof",
      label: "Aadhar No",
      options: {
       filter: false,
       sort: true,
      }
     },
    {
      name: "CollegeName",
      label: "College Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Fee",
      label: "Room Fee",
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
        title={"Fee Details of All Students"}
        data={studentsFeeDetails}
        columns={columns}
        options={options}
      />
      </ThemeProvider>
    :
    <img src={NoAccess}></img>
  );
};

export default StudentsFeeDetails;
