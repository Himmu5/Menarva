import axios from "axios";
import { Manager } from "../Typings/Manager";
import { Shop } from "../Typings/Shop";
import { OwnerHeader , CustomHeader } from "./Headers";
import axiosInstance from "./axios";
import { UserClass } from "../Typings/User";

export const getShops = async (user : UserClass , accessToken ?: string ) => {
  const stores = await axiosInstance.get("/api/v1/shops/", {
    headers: { ...OwnerHeader , Authorization : accessToken || localStorage.getItem('token') } 
  });
  console.log("accessToken :", accessToken);

  const storeMangers = {} as { [key: number]: { store: Shop; Managers: Manager[] } };
  stores.data.result.forEach(async (store: any) => {
    const Managers = await axiosInstance.get(
      `/api/v1/tenants/employees?entityId=${store.id}`,
      {
        headers: { ...OwnerHeader , Authorization : accessToken || localStorage.getItem('token')}
      }
    );
    storeMangers[store.id] = { store, Managers: Managers.data.result };
  });
  // return storeMangers;
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve(storeMangers)
    } , 1* 1000)
    
  });
};

export const getminiStore = (id: number ,accessToken:string) => {
  return axios
    .get(import.meta.env.VITE_BASE_URL+`/api/v1/shops/mini_shops`, {
      headers: {...OwnerHeader , Entity :  "Chroma" , Authorization : accessToken || localStorage.getItem("token") },
    })
    .then((res) => {
      // console.log("Res :", res.data);
      return res.data;
    });
};
