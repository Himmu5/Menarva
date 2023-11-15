import { AlertType } from "../Typings/Alert";

export const checkResponse = (res : any , setAlert : (s:AlertType)=>void)=>{
    if(res?.code === 200){
        setAlert({type : "success" , message : res?.message});
    }
    else if(res?.code !== 200){
        setAlert({ type: "error", message: res.message });
    }
}