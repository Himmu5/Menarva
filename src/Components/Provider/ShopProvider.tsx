import { FC, ReactNode, useEffect, useState } from 'react'
import { getShops, getminiStore } from '../../Axios/store';
import { MiniShop, Shop } from '../../Typings/Shop';
import { ShopContext } from '../../Context/Store';
import { addSales, getDailySale, getMonthSales } from '../../Axios/sales';
import { useNavigate } from 'react-router-dom';
import { withUser } from '../../HOC/withUser';
import axiosInstance from '../../Axios/axios';
import { UserClass } from '../../Typings/User';
import { withAlert } from '../../HOC/withAlert';
import { AlertType } from '../../Typings/Alert';
import { Manager } from '../../Typings/Manager';
type P = {
    children: ReactNode;
    shopId: number,
    user: UserClass;
    setAlert: (s: AlertType) => void
}
const ShopProvider: FC<P> = ({ children, shopId, user, setAlert }) => {
    const Navigate = useNavigate();
    const [shops, setShops] = useState<{
        [key: number]: {
            store: Shop;
            Managers: Manager[];
        };
    }>();
    const [selectedShop, setSelectedShop] = useState<Shop>();
    const [miniShopsData, setMiniShops] = useState<MiniShop>();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [monthSales, setmonthSales] = useState();
    const [changeMonth, setChangeMonth] = useState(new Date());
    const [loading, setLoading] = useState(true);

    // console.log("changeMonth  : ", changeMonth);

    useEffect(() => {
        if (user?.role === 1) {
            getShops().then((res:any) => {
                console.log("res : ", res);
                setShops(res);
            })
        }
    }, [user])

    useEffect(() => {
        if (selectedShop) {
            getMiniStores(selectedShop.id);
        }

    }, [selectedShop, user])

    useEffect(() => {
        if (user && shopId) {
            axiosInstance.get("/shops/" + shopId, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') , 
            "ngrok-skip-browser-warning": 69420, } }).then((res) => {
                // console.log("Res : ",res.data.result);
                setSelectedShop(res.data.result);
            })
        }
    }, [shopId, user])

    useEffect(() => {

        getMonthSale();

    }, [selectedShop, changeMonth.getMonth()])

    function getMonthSale() {
        if (selectedShop && user?.role === 1) {
            // console.log("Change Month : ", changeMonth)
            getMonthSales(selectedShop.id, changeMonth.getFullYear(), changeMonth.getMonth()).then((res) => {
                setmonthSales(res);
            })
        }
    }

    function getMiniStores(id: number) {
        getminiStore(id).then((res) => {
            setMiniShops(res)
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }

    const [dailySales, setDailySales] = useState();
    function getDailySales() {
        // const date = formatDateToYYYYMMDD(selectedDate!);
        if (user?.role === 1) {
            // const longDate = selectedDate! * 1
            const longDate =  selectedDate! as any * 1

            getDailySale(selectedShop!.id, longDate ).then((res) => {
                setDailySales(res);
                Navigate('/ministore/sales/report');
                // console.log("Get Daily sales : ", res);
            })
        }
    }
    useEffect(() => {
        if (selectedDate && selectedShop) {
            getDailySales();
        }
    }, [selectedDate])

    function uploadSales(shopId: number, data: {
        shopId: number;
        storeName: string;
        date: number;
        totalSales: number;
    }) {
        addSales(shopId, data).then((res) => {
            setAlert({ message: res.message, type: "success" });
        }).catch((err) => {
            setAlert({ message: err.response.status === 403 ? "You are not allowed to upload sales please contact admin" : err.message, type: "error" });
        })
    }

    return <ShopContext.Provider value={{ changeMonth, getMonthSale, setChangeMonth, uploadSales, getMiniStores, loading, shops, selectedShop, setSelectedShop, miniShopsData, selectedDate, setSelectedDate, monthSales, dailySales }} >
        {children}
    </ShopContext.Provider>
}
export default withAlert(withUser(ShopProvider));