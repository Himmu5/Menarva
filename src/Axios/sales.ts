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
      `/api/v1/accounting/sales_calendar/${id}?year=${year}&month=${
        monthNames[month]
      }`
    )
    .then((res) => {
      return res.data;
    });
}
