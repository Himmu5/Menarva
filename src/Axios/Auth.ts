import axios from "axios";
// import axiosInstance from "./axios";

export function loginUser(formData: { username: string; password: string }) {
  return axios
    .post(import.meta.env.VITE_BASE_URL + "/users/sign_in", {
      username: formData.username,
      password: formData.password,
    })
    .then(async (res) => {
      const config = await axios.get(
        import.meta.env.VITE_BASE_URL + "/users/config",
        {
          headers: {
            Authorization: "Bearer " + res.data.result.accessToken,
            "ngrok-skip-browser-warning": 69420,
          },
        }
      );
      console.log("Config ;", config);
      return { user: res.data.result, config: config.data };
    });
}
