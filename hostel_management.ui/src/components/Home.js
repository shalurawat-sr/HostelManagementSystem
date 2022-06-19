import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import studentService from "../services/student.service";
import { NotificationManager } from 'react-notifications';
import AuthService from "../services/auth.service";
import NoAccess from "../NoAccess.png";

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const [studentsList, setStudentsList] = useState([]);
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  useEffect(()=>{
    if(currentUser){
      studentService.getAllStudents().then(
        (response) => {
          setStudentsList(response.data);
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
     name: "Name",
     label: "Name",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
      name: "MobileNo",
      label: "Mobile No",
      options: {
       filter: false,
       sort: false,
      }
     },
     {
      name: "Address",
      label: "Address",
      options: {
       filter: false,
       sort: false,
      }
     },
    {
     name: "EmailId",
     label: "Email Id",
     options: {
      filter: false,
      sort: false,
     }
    },
    {
      name: "IdProof",
      label: "Aadhar No",
      options: {
       filter: false,
       sort: false,
      }
     },
    {
     name: "DOB",
     label: "DOB",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "Gender",
     label: "Gender",
     options: {
      filter: true,
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
    //  {
    //   name: "Edit",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <button onClick={() => window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)}>
    //           Edit
    //         </button>
    //       );
    //     }
    //   }
    // },
   ];
   

   const options = {
      filterType: 'checkbox',
      onRowsDelete: (rowsDeleted) => {
        const idsToDelete = rowsDeleted.data.map(d => studentsList[d.dataIndex].Id); // array of all ids to to be deleted
        console.log(idsToDelete);
        studentService.deleteStudents(idsToDelete).then(
          (response) => {
            NotificationManager.success(response.data);
          },
          (error) => {
            NotificationManager.error("Delete failed...");
          }
        );
      }
   };

  return (
    (currentUser) ?
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Students List"}
          data={studentsList}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
      :
      <img src={NoAccess}></img>
  );
};

export default Home;
