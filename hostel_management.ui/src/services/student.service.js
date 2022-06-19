import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:44372/api/";

const getAllStudents = () => {
  return axios.get(API_URL + "Students/GetAllStudents", { headers: authHeader() });
};

const deleteStudents = (data) => {
  return axios.post(API_URL + "Students/DeleteStudents", data,  { headers: authHeader() });
};

const studentRoomAllocation = (roomId, studentId) => {
  return axios.get(API_URL + "Students/StudentRoomAllocation/"+roomId+"/"+studentId+""
  , { headers: authHeader() });
};


const getAvaialableRoomsForCheckin = () => {
  return axios.get(API_URL + "Room/getAvailableRoomsForCheckin"
  , { headers: authHeader() });
};

const getRoomFeeDetails = (studentId) => {
  return axios.get(API_URL + "Students/GetFeeDetailsOfStudent/"+ studentId +""
  , { headers: authHeader() });
};

const CheckoutRoom = (studentId) => {
  return axios.get(API_URL + "Students/CheckoutRoom/"+ studentId +""
  , { headers: authHeader() });
};

const apistudentregister = (studentData) => {
  return axios.post(API_URL + "Students/Registration", studentData);
};

const getStudentProfileById = (studentId) => {
  return axios.get(API_URL + "Students/GetStudentUser/"+ studentId +"", { headers: authHeader() });
};

const updateStudentProfile = (studentData) => {
  return axios.post(API_URL + "Students/UpdateStudentProfile", studentData, { headers: authHeader() });
};

export default {
  getAllStudents,
  deleteStudents,
  studentRoomAllocation,
  getAvaialableRoomsForCheckin,
  getRoomFeeDetails,
  CheckoutRoom,
  apistudentregister,
  getStudentProfileById,
  updateStudentProfile
};
