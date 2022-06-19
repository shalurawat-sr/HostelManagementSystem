import axios from "axios";

const API_URL = "https://localhost:44372/api/";

const register = (name, username, email, password) => {
  return axios.post(API_URL + "Admin/Registration", {
    Name: name,
    Username: username,
    EmailId: email,
    Password: password
  });
};

const login = (username, password, isAdmin) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
      isAdmin
    })
    .then((response) => {
      if (response.data.Token) {
        response.data.IsAdmin = isAdmin;
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
