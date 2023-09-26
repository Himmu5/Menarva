import axios from "axios";
// import axiosInstance from "./axios";

export function loginUser(formData: { username: string; password: string }) {
  return axios
    .post(import.meta.env.VITE_BASE_URL + "/users/sign_in", {
      username: formData.username,
      password: formData.password,
    })
    .then((res) => {
      return res.data.result;
    });
}
