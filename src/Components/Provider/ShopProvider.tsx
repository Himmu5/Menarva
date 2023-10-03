import { FC, ReactNode, useEffect, useState } from 'react'
import { getShops, getminiStore } from '../../Axios/store';
import { MiniShop, Shop } from '../../Typings/Shop';
import { ShopContext } from '../../Context/Store';
import { addSales, getDailySale, getMonthSales } from '../../Axios/sales';
import { useNavigate } from 'react-router-dom';
import { withUser } from '../../HOC/withUser';
import axiosInstance from '../../Axios/axios';
import { UserClass } from '../../Typings/User';
type P = {
    children: ReactNode;
    shopId: number,
    user: UserClass
}
const ShopProvider: FC<P> = ({ children, shopId, user }) => {
    const Navigate = useNavigate();
    const [shops, setShops] = useState<Shop[]>();
    const [selectedShop, setSelectedShop] = useState<Shop>();
    const [miniShopsData, setMiniShops] = useState<MiniShop>();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [monthSales, setmonthSales] = useState();
    const [loading, setLoading] = useState(true);

    console.log("monthSales  : ", monthSales);

    useEffect(() => {
        getShops().then((res) => {
            console.log("res : ", res.result);
            setShops(res.result);
        })
    }, [user])

    useEffect(() => {
        if (selectedShop) {
            getMiniStores(selectedShop.id);
        }

    }, [ selectedShop, user])

    useEffect(() => {
        axiosInstance.get("/shops/" + shopId, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }).then((res) => {
            // console.log("Res : ",res.data.result);
            setSelectedShop(res.data.result);
        })
    }, [shopId , user])

    useEffect(() => {
        if (selectedShop) {

            getMonthSales(selectedShop.id, selectedDate.getFullYear(), selectedDate.getMonth()).then((res) => {
                console.log("monthSales .", res);
                setmonthSales(res);
            })

        }

    }, [selectedShop , selectedDate])

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
        const date = formatDateToYYYYMMDD(selectedDate);
        getDailySale(selectedShop!.id, date).then((res) => {
            setDailySales(res);
            Navigate('/ministore/sales/report');
            // console.log("Get Daily sales : ", res);
        })
    }
    function formatDateToYYYYMMDD(date:Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        console.log("day: " ,`${year}-${month}-${day}`);        
        return `${year}-${month}-${day}`;
      }

    useEffect(() => {
        if (selectedDate && selectedShop) {
            getDailySales();
        }
    }, [selectedDate])

    function uploadSales(shopId: number, data: {
        shopId: number;
        storeName: string;
        date: string;
        totalSales: number;
    }) {
        addSales(shopId, data).then((res) => {
            alert(res.message);
        }).catch((err) => {
            alert(err);
        })
    }

    return <ShopContext.Provider value={{ formatDateToYYYYMMDD , uploadSales, getMiniStores, loading, shops, selectedShop, setSelectedShop, miniShopsData, selectedDate, setSelectedDate, monthSales, dailySales }} >
        {children}
    </ShopContext.Provider>
}
export default withUser(ShopProvider);