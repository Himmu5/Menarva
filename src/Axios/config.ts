import { CustomHeader , OwnerHeader } from "./Headers";
import axiosInstance from "./axios";

export function getConfig() {
  return axiosInstance
    .get("/users/config", {
      headers: OwnerHeader,
    })
    .then((res) => {
      return res.data;
    });
}
