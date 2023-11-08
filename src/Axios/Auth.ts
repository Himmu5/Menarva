import axios from "axios";
import { CustomHeader, OwnerHeader } from "./Headers";
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
      const config = await axios.get(
        import.meta.env.VITE_BASE_URL + "/users/config",
        {
          headers: {...OwnerHeader , Authorization: "Bearer " + res.data.result.accessToken},
        }
      );
      localStorage.setItem("token", res.data.result.accessToken);
      return { user: res.data.result, config: config.data };
    });
}
