import { UserConfig } from "../Typings/User";
import axiosInstance from "./axios";

export const getManagers = () => {
  return axiosInstance.get("/shops/managers" ,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }).then((res) => {
    return res.data;
  });
};

export const addManager = (
  config: UserConfig,
  shopId: number,
  user: { name: string; email: string; password: string; type: string }
) => {
  const data = {
    user,
    authorities: {
      authorities: { authorities: { ...config } },
      shopAuthorities: {},
    },
  };
  return axiosInstance.post(`/shops/${shopId}/manager` , { ...data  } , { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }).then((res) => {
    console.log("Res : ",res);
    return res.data;
  });
};
