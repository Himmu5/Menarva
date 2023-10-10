import axiosInstance from "./axios";

export function getConfig(){
    return axiosInstance.get('/users/config' , { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }).then((res)=>{
        // console.log("Res : ",res.data);
        return res.data;
    })
}