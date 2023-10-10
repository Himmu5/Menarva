import axiosInstance from "./axios";

export const getSOP = () => {
//   const token = "Bearer " + localStorage.getItem("token");
  return axiosInstance
    .get("/api/v1/shops/3/sops")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log("Error ", err.message);
    });
};
