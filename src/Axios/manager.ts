import { UserConfig } from "../Typings/User";
import axiosInstance from "./axios";

export const getManagers = () => {
  return axiosInstance
    .get("/shops/managers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": 69420,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const addManager = (
  config: UserConfig,
  shopId: number,
  user: { name: string; email: string; password: string; type: string }
) => {
  const data = {
    user,
    authorities: {
      authorities: { authorities: { ...config } },
      shopAuthorities: {},
    },
  };
  return axiosInstance
    .post(
      `/shops/${shopId}/manager`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": 69420,
        },
      }
    )
    .then((res) => {
      // console.log("Res : ",res);
      return res.data;
    });
};

export const editManager = (
  config: UserConfig,
  shopId: number,
  user: { name: string; email: string; password: string; type: string },
  mId: number
) => {
  const data = {
    user: { ...user, id: mId, role: 2 },
    authorities: {
      authorities: { authorities: { ...config } },
      shopAuthorities: {},
    },
  };
  const newData = { ...data, releaseShopId: null };

  return axiosInstance
    .put(`/shops/update_manager?shopId=${shopId}`, newData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": 69420,
      },
    })
    .then((res) => {
      // console.log("Res : ",res);
      return res.data;
    });
};

export const getSingleManagers = (id: number) => {
  return axiosInstance
    .get("/shops/manager/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": 69420,
      },
    })
    .then((res) => {
      return res.data;
    });
};
