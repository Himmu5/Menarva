import axios from "axios";
import { UserConfig } from "../Typings/User";
import axiosInstance from "./axios";
import { OwnerHeader } from "./Headers";
import { Authorities } from "../Typings/Manager";

export const getManagers = () => {
  return axiosInstance
    .get("/api/v1/tenants/employees", {
      headers: OwnerHeader,
    })
    .then((res) => {
      return res.data;
    });
};

export const addManager = (user: {
  name: string;
  email: string;
  password: string;
  type: string;
  roleId: string;
}) => {
  return axiosInstance
    .post(
      `/api/v1/tenants/employee`,
      { ...user },
      {
        headers: { ...OwnerHeader, Entity: "Chroma" },
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
  mId: number,
  detacheShopId?: number
) => {
  const data = {
    user: { ...user, id: mId, role: 2 },
    authorities: {
      authorities: { authorities: { ...config } },
      shopAuthorities: {},
    },
  };
  const newData = {
    ...data,
    releaseShopId: detacheShopId ? detacheShopId : null,
  };

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
    .get("/api/v1/tenants/employee/" + id, {
      headers: OwnerHeader
    })
    .then((res) => {
      return res.data;
    });
};

export const attachToShop = (shopId: number, userId: number) => {
  return axios
    .post(
      import.meta.env.VITE_BASE_URL + `/api/v1/tenants/assign_employee`,
      {
        userId,
        entityId: shopId,
      },
      {
        headers: OwnerHeader
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
};

export const detachToShop = (shopId: number, userId: number) => {
  return axios
    .post(
      import.meta.env.VITE_BASE_URL + `/api/v1/tenants/release_employee`,
      {
        userId,
        entityId: shopId,
      },
      {
        headers: OwnerHeader
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
};

export const getEmployeeRoles = () => {
  return axiosInstance
    .get("/api/v1/tenants/roles", {
      headers: OwnerHeader,
    })
    .then((res) => {
      return res.data;
    });
};

export const addNewRole = (name: string, authorities: Authorities) => {
  return axiosInstance
    .post(
      "/api/v1/tenants/role",
      {
        name,
        authorities,
        role: 2,
      },
      {
        headers: { ...OwnerHeader, "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      return res.data;
    });
};
