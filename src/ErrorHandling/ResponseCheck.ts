import { AlertType } from "../Typings/Alert";

export const checkResponse = (res : any , setAlert : (s:AlertType)=>void)=>{
    console.log("res : ",res);
    if(res.code === 200){
        setAlert({type : "success" , message : "Logged in successfully"});
    }
    else{
        setAlert({ type: "error", message: res.message });
    }
}