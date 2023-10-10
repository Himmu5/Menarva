import axios from "axios";
// import axiosInstance from "./axios";

export const getSOP = () => {
//   const token = "Bearer " + localStorage.getItem("token");
  return axios
    .get("http://localhost:8080/api/v1/shops/3/sops" , { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error ", err.message);
    });
};
