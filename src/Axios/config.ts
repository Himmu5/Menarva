import axiosInstance from "./axios";

export function getConfig() {
  return axiosInstance
    .get("/users/config", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": 69420,
      },
    })
    .then((res) => {
      // console.log("Res : ",res.data);
      return res.data;
    });
}
