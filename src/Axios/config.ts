import { CustomHeader } from "./Headers";
import axiosInstance from "./axios";

export function getConfig() {
  return axiosInstance
    .get("/users/config", {
      headers: {...CustomHeader},
    })
    .then((res) => {
      console.log("Res : ",res.data);
      return res.data;
    });
}
