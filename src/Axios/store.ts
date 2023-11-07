import axios from "axios";
import { Manager } from "../Typings/Manager";
import { Shop } from "../Typings/Shop";
import { CustomHeader } from "./Headers";
import axiosInstance from "./axios";

export const getShops = async () => {
  const token = "Bearer " + localStorage.getItem("token");
  const stores = await axiosInstance.get("/shops/", {
    headers: { Authorization: token, "ngrok-skip-browser-warning": 69420 },
  });
  // console.log("stores :", stores);

  const storeMangers = {} as { [key: number]: { store: Shop; Managers: Manager[] } };
  stores.data.result.forEach(async (store: any) => {
    const Managers = await axiosInstance.get(
      `shops/managers?shopId=${store.id}`,
      {
        headers: { Authorization: token, "ngrok-skip-browser-warning": 69420 },
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

export const getminiStore = (id: number) => {
  return axios
    .get(import.meta.env.VITE_BASE_URL+`/api/v1/shops/mini_shops`, {
      headers:{
        ...CustomHeader,
        Authorization: "Bearer " + localStorage.getItem("token")
      },
    })
    .then((res) => {
      // console.log("Res :", res.data);
      return res.data;
    });
};
