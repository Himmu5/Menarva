import { CustomHeader , OwnerHeader } from "./Headers";
import axiosInstance from "./axios";

export function getConfig() {
  return axiosInstance
    .get("/users/config", {
      headers: OwnerHeader,
    })
    .then((res) => {
      console.log("Res : ",res.data);
      return res.data;
    });
}
