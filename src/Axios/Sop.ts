import axios from "axios";
import axiosInstance from "./axios";
import { CustomHeader, OwnerHeader } from "./Headers";

export const getSOP = (
  shopId: number,
  sopDate?: Date,
  shopName?: string,
  accessToken?: string
) => {
  const dateLong = sopDate && (sopDate as any) * 1;
  let url = "";
  if (dateLong) {
    url = `/api/v1/sops/?date=${dateLong}`;
  } else {
    url = `/api/v1/sops/`;
  }

  return axiosInstance
    .get(url, {
      headers: {
        ...OwnerHeader,
        Entity: shopName,
        Authorization: accessToken || localStorage.getItem("token"),
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
  storeId: number,
  accessToken: string
) {
  return axiosInstance
    .post(`/api/v1/sops/${sopId}/tasks/${taskId}/image`, formData, {
      headers: {
        ...CustomHeader,
        Authorization: accessToken || localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error ", err);
    });
}

export const getSopByCalendar = (shopId: number,shopName : string, accessToken: string) => {
  const config = {
    method: "get", // Use the GET method
    url: import.meta.env.VITE_BASE_URL + `/api/v1/sops/calender`, // Replace with your API endpoint
    headers: {
      ...OwnerHeader,
      Entity: shopName,
      Authorization: accessToken || localStorage.getItem("token"),
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
  sopId: string,
  taskId: number,
  accessToken: string
) => {
  return axiosInstance
    .put(
      `/api/v1/sops/${sopId}/tasks/${taskId}`,
      {},
      {
        headers: {
          ...CustomHeader,
          Authorization: accessToken || localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};
