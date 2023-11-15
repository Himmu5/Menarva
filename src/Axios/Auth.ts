import axios from "axios";
import { CustomHeader, OwnerHeader } from "./Headers";
import { AlertType } from "../Typings/Alert";
// import axiosInstance from "./axios";

export function loginUser(
  formData: { username: string; password: string },
  checkResponse: (res: any, setAlert: (s: AlertType) => void) => void,
  setAlert: (s: AlertType) => void
) {
  return axios
    .post(import.meta.env.VITE_BASE_URL + "/users/sign_in", {
      username: formData.username,
      password: formData.password,
    })
    .then(async (res) => {
      if (res.data.code !== 200) {
        checkResponse(res.data, setAlert);
        return new Promise(() => {});
      } else {
        return axios
          .get(import.meta.env.VITE_BASE_URL + "/users/config", {
            headers: {
              ...OwnerHeader,
              Authorization: "Bearer " + res.data.result.accessToken,
            },
          })
          .then((config) => {
            localStorage.setItem("token", res.data.result.accessToken);
            if(config.data.code !== 200 ){
              checkResponse(config.data, setAlert);
              return new Promise(() => {});
            }
            return {
              user: {
                ...res.data.result,
                user: {
                  ...res.data.result.user,
                  entities: config.data.result.entities,
                },
              },
              config: config.data.result.authorities,
              code: config.data.code,
              message: "Logged in successfully",
            };
          });
      }
    });
}
