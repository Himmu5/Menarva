import axiosInstance from "./axios"

export const getURLAuthentication = ()=>{
    return axiosInstance.get("/api/v1/tenants/tenant_details").then(()=>{
        console.log("Authenticated")
    }).catch(()=>{
        console.log("Unauthenticated")
    })
}