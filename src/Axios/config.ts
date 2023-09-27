import axiosInstance from "./axios";

export function getConfig(){
    return axiosInstance.get('/users/config').then((res)=>{
        console.log("Res : ",res.data);
        return res.data;
    })
}