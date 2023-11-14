import axios from "axios";
import { UserConfig } from "../Typings/User";
import axiosInstance from "./axios";
import { OwnerHeader } from "./Headers";
import { Authorities } from "../Typings/Manager";

export const getManagers = (token?: string, accessToken?: string) => {
  return axiosInstance
    .get("/api/v1/tenants/employees", {
      headers: {
        ...OwnerHeader,
        Authorization: accessToken || localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const addManager = (
  user: {
    name: string;
    email: string;
    password: string;
    type: string;
    roleId: string;
  },
  accessToken?: string
) => {
  return axiosInstance
    .post(
      `/api/v1/tenants/employee`,
      { ...user },
      {
        headers: {
          ...OwnerHeader,
          Authorization: accessToken || localStorage.getItem("token"),
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
  user: { name?: string; username?: string; email?: string },
  mId: number,
  detacheShopId?: number,
  accessToken?: string
) => {
  const data = {
    user: { ...user, role: import.meta.env.VITE_USER_ROLE, id: mId },
  };

  return axiosInstance
    .patch(
      `/api/v1/tenants/employee`,
      { ...data.user },
      {
        headers: {
          ...OwnerHeader,
          Authorization: accessToken || localStorage.getItem("token")
        },
      }
    )
    .then((res) => {
      // console.log("Res : ",res);
      return res.data;
    });
};

export const getSingleManagers = (id: number, accessToken: string) => {
  return axiosInstance
    .get("/api/v1/tenants/employee/" + id, {
      headers: {
        ...OwnerHeader,
        Authorization: accessToken || localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const attachToShop = (
  shopId: number,
  userId: number,
  accessToken: string
) => {
  return axios
    .post(
      import.meta.env.VITE_BASE_URL + `/api/v1/tenants/assign_employee`,
      {
        userId,
        entityId: shopId,
      },
      {
        headers: {
          ...OwnerHeader,
          Authorization: accessToken || localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
};

export const detachToShop = (
  shopId: number,
  userId: number,
  accessToken: string
) => {
  return axios
    .post(
      import.meta.env.VITE_BASE_URL + `/api/v1/tenants/release_employee`,
      {
        userId,
        entityId: shopId,
      },
      {
        headers: {
          ...OwnerHeader,
          Authorization: accessToken || localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
};

export const getEmployeeRoles = (accessToken: string) => {
  return axiosInstance
    .get("/api/v1/tenants/roles", {
      headers: {
        ...OwnerHeader,
        Authorization: accessToken || localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const addNewRole = (
  name: string,
  authorities: Authorities,
  accessToken: string
) => {
  return axiosInstance
    .post(
      "/api/v1/tenants/role",
      {
        name,
        authorities,
        role: 2,
      },
      {
        headers: {
          ...OwnerHeader,
          Authorization: accessToken || localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};

export const getRoleTemplate = (accessToken: string) => {
  return axiosInstance
    .get("/api/v1/tenants/role_template", {
      headers: {
        ...OwnerHeader,
        Authorization: accessToken || localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
};
