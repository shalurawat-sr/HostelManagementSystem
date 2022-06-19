import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:44372/api/";

const getAllStudentsFeeDetails = () => {
  return axios.get(API_URL + "Students/GetFeeDetailsOfAllStudents", { headers: authHeader() });
};

const addRoom = (data) => {
  return axios.post(API_URL + "Room/CreateRoom", data,  { headers: authHeader() });
};

const getAllRooms = () => {
  return axios.get(API_URL + "Room/getAllRooms", { headers: authHeader() });
};

const activateOrDeactivateRoom = (data) => {
  return axios.post(API_URL + "Room/ActivateDeactivateRoom", data, { headers: authHeader() });
};

const getAdminProfileById = (adminId) => {
  return axios.get(API_URL + "Admin/GetAdminUser/"+ adminId +"", { headers: authHeader() });
};

const updateAdminProfile = (adminData) => {
  return axios.post(API_URL + "Admin/UpdateProfile", adminData, { headers: authHeader() });
};

const getMaxRoomNumber =()=>{
  return axios.get(API_URL+"Room/getMaxRoomNo",{headers: authHeader()});
};

export default {
    getAllStudentsFeeDetails,
    addRoom,
    getAllRooms,
    activateOrDeactivateRoom,
    getAdminProfileById,
    updateAdminProfile,
    getMaxRoomNumber
};
