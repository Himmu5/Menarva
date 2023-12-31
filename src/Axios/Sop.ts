import axios from "axios";
import axiosInstance from "./axios";

export const getSOP = (shopId: number, sopDate?: Date) => {
  //   const token = "Bearer " + localStorage.getItem("token");
  console.log("shopId ", shopId);
  const dateLong = sopDate && (sopDate as any) * 1;
  console.log("Date  ", dateLong);
  let url = "";
  if (dateLong) {
    url = `/api/v1/shops/${shopId}/sops?date=${dateLong}`;
  } else {
    url = `/api/v1/shops/${shopId}/sops`;
  }

  return axiosInstance
    .get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": 69420,
      },
    })
    .then((res) => {
      return res.data.result.sops;
    })
    .catch((err) => {
      return err.message;
    });
};

export function uploadImage(
  formData: FormData,
  sopId: number,
  taskId: number,
  storeId: number
) {
  return axiosInstance
    .post(
      `/api/v1/shops/${storeId}/sops/${sopId}/tasks/${taskId}/image`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": 69420,
        },
      }
    )
    .then((res) => {
      console.log("res ", res);
    })
    .catch((err) => {
      console.log("Error ", err);
    });
}

export const getSopByCalendar = (shopId:number) => {
  const config = {
    method: "get", // Use the GET method
    url:
      import.meta.env.VITE_BASE_URL + `/api/v1/shops/${shopId}/sops/calender`, // Replace with your API endpoint
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": 69420,
    },
    data: {},
  };
  return axios(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("error ", err);
    });
};

export const setTaskStatus = (
  shopId: number,
  sopId: string,
  taskId: number
) => {
  return axiosInstance
    .put(
      `/api/v1/shops/${shopId}/sops/${sopId}/tasks/${taskId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": 69420,
        },
      }
    )
    .then(() => {
      console.log("Task status updated");
    });
};
