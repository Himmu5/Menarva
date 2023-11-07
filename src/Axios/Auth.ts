import axios from "axios";
import { CustomHeader } from "./Headers";
// import axiosInstance from "./axios";

export function loginUser(formData: { username: string; password: string }) {
  return axios
    .post(
      import.meta.env.VITE_BASE_URL + "/users/sign_in",
      {
        username: formData.username,
        password: formData.password,
      },
      { headers: { dummyhost: "Chroma.Reliance.minerva.com" } }
    )
    .then(async (res) => {
      // console.log("Res : ", res.data.result.accessToken);
      
      const config = await axios.get(
        import.meta.env.VITE_BASE_URL + "/users/config",
        {
          headers: {...CustomHeader , Authorization: "Bearer " + res.data.result.accessToken},
        }
      );
      console.log("Config ;", config);
      return { user: res.data.result, config: config.data };
    });
}
