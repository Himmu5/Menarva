import axios from "axios";
import axiosInstance from "./axios";

export const getSOP = () => {
  //   const token = "Bearer " + localStorage.getItem("token");
  return axiosInstance
    .get("/api/v1/shops/3/sops", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      return res.data.result.sops;
    })
    .catch((err) => {
      return err.message;
    });
};

export function uploadImage(formData: FormData , sopId:number , taskId :number , storeId:number) {
  return axiosInstance
    .post(
      `/api/v1/shops/${storeId}/sops/${sopId}/tasks/${taskId}/image`,
      formData,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    )
    .then((res) => {
      console.log("res ", res);
    })
    .catch((err) => {
      console.log("Error ", err);
    });
}


export const getSopByCalendar = (sopId: number) => {
  const config = {
    method: 'get', // Use the GET method
    url: import.meta.env.VITE_BASE_URL+"/api/v1/shops/3/sops/calender", // Replace with your API endpoint
    headers: { 
      'Authorization': 'Bearer ' + localStorage.getItem("token"), 
      'Content-Type': 'application/json'
    },
    data: {},
  };
  return axios(config).then((res)=>{
    return res.data;
  }).catch((err)=>{  
    console.log("error ", err);
  })
}