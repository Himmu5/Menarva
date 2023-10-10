import axiosInstance from "./axios";

export const getSOP = () => {
//   const token = "Bearer " + localStorage.getItem("token");
  return axiosInstance
    .get("/api/v1/shops/3/sops" , { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
    .then((res) => {
      return res.data.result.sops;
    })
    .catch((err) => {
      return err.message;
    });
};
