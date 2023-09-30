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
  console.log("Date :", date);

  return axiosInstance
    .get(`/api/v1/accounting/get_daily_sales/${id}?date=${date}`)
    .then((res) => {
      return res.data;
    });
}

export function addSales(
  shopId: number,
  data: {
    shopId: number;
    storeName: string;
    date: string;
    totalSales: number;
  }
) {
  return axiosInstance
    .post(`/api/v1/accounting/${shopId}/add_sales`, data)
    .then((res) => {
      return res.data;
    });
}

// export function addSales() {
//   axiosInstance.post("/api/v1/accounting/3/add_sales",  {
//     shopId: 3,
//     storeName: "Himanshu",
//     date: "2023-09-29",
//     dineInSales: 78.9,
//     takeAwaySales: 78.9,
//     onlineSales: 78.9,
//     totalSales: 78.9,
//   }).then((res)=>{
//     console.log("Res :",res);
//   })
// }
