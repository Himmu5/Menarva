import axiosInstance from "./axios"

export const getURLAuthentication = ()=>{
    return axiosInstance.get("/api/v1/tenants/tenant_details").then((res)=>{
        return res.data;
    }).catch(()=>{
        console.log("Unauthenticated")
    })
}