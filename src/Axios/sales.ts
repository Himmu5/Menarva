import { CustomHeader } from "./Headers";
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

export function getMonthSales(id: number, year: number, month: number) {
  return axiosInstance
    .get(
      `/api/v1/accounting/sales_calendar/${id}?year=${year}&month=${monthNames[month]}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": 69420,
        },
      }
    )
    .then((res) => {
      return res.data;
    });
}

export function getDailySale(id: number, date: number) {
  console.log("Date :", date);

  return axiosInstance
    .get(`/api/v1/accounting/get_daily_sales/${id}?date=${date}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": 69420,
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
  }
) {
  return axiosInstance
    .post(
      `/api/v1/accounting/add_sales/${data.miniShopId}`,
      data,
      {
        headers: CustomHeader,
      }
    )
    .then((res) => {
      return res.data;
    });
}

