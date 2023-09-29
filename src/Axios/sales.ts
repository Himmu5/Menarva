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
      `/api/v1/accounting/sales_calendar/${id}?year=${year}&month=${monthNames[month]}`
    )
    .then((res) => {
      return res.data;
    });
}

export function getDailySale(id: number, date: string) {
  console.log("Date :",date);
  
  return axiosInstance
    .get(`/api/v1/accounting/get_daily_sales/${id}?date=${date}`)
    .then((res) => {
      return res.data;
    });
}
