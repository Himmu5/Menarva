import axiosInstance from "./axios"

const getURLAuthentication = ()=>{
    axiosInstance.get("/api/v1/tenants/tenant_details").then(()=>{
        console.log("Authenticated")
    }).catch(()=>{
        console.log("Unauthenticated")
    })
}