import { CustomHeader, OwnerHeader } from "./Headers";
import axiosInstance from "./axios";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getMonthSales(
  id: number,
  year: number,
  month: number,
  shopName : string,
  accessToken?: string
) {
  return axiosInstance
    .get(
      `/api/v1/accounting/sales_calendar/${id}?year=${year}&month=${monthNames[month]}`,
      {
        headers: {
          ...OwnerHeader,
          Entity: "chroma",
          Authorization: accessToken || localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      return res.data;
    });
}

export function getDailySale(
  id: number,
  date: number,
  shopName: string,
  accessToken: string
) {
  console.log("Date :", date);

  return axiosInstance
    .get(`/api/v1/accounting/get_daily_sales/${id}?date=${date}`, {
      headers: {
        ...OwnerHeader,
        Entity: shopName,
        Authorization: accessToken || localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
}

export function addSales(
  shopId: number,
  data: {
    miniShopId: number;
    date: number;
    totalSales: number;
  },
  accessToken: string
) {
  return axiosInstance
    .post(`/api/v1/accounting/add_sales/${data.miniShopId}`, data, {
      headers: {
        ...OwnerHeader,
        Entity: "chroma",
        Authorization: accessToken || localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
}
