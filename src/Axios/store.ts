import axiosInstance from "./axios";

export const getShops = () => {
  return axiosInstance
    .get("/shops/", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const getminiStore = (id: number) => {
  return axiosInstance
    .get(`/shops/${id}/mini_shops`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      console.log("Res :", res.data);
      return res.data;
    });
};
