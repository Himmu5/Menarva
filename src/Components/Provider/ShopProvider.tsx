import { FC, ReactNode, useEffect, useState } from 'react'
import { getShops, getminiStore } from '../../Axios/store';
import { MiniShop, Shop } from '../../Typings/Shop';
import { ShopContext } from '../../Context/Store';
import { addSales, getDailySale, getMonthSales } from '../../Axios/sales';
import { useNavigate } from 'react-router-dom';
import { withUser } from '../../HOC/withUser';
import axiosInstance from '../../Axios/axios';
type P = {
    children: ReactNode;
    shopId: number
}
const ShopProvider: FC<P> = ({ children, shopId }) => {
    const Navigate = useNavigate();
    const [shops, setShops] = useState<Shop[]>();
    const [selectedShop, setSelectedShop] = useState<Shop>();
    const [miniShopsData, setMiniShops] = useState<MiniShop>();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [monthSales, setmonthSales] = useState();
    const [loading, setLoading] = useState(true);

    console.log("selectedShop  : ", selectedShop);

    useEffect(() => {
        getShops().then((res) => {
            console.log("res : ", res.result);
            setShops(res.result);
        })
    }, [])

    useEffect(() => {
        if (selectedShop) {
            getMiniStores(selectedShop.id);
        }

    }, [selectedShop])

    useEffect(() => {
        axiosInstance.get("/shops/" + shopId).then((res) => {
            // console.log("Res : ",res.data.result);
            setSelectedShop(res.data.result);
        })
    }, [shopId])

    useEffect(() => {
        if (selectedShop) {

            getMonthSales(selectedShop.id, 2023 || selectedDate.getFullYear(), 8 || selectedDate.getMonth()).then((res) => {
                console.log("res .", res);
                setmonthSales(res);
            })

        }

    }, [selectedShop])

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
        const date = selectedDate.getDate();
        const month = selectedDate.getMonth() < 10 ? "0" + (selectedDate.getMonth() + 1) : selectedDate.getMonth();
        const year = selectedDate.getFullYear();
        getDailySale(selectedShop!.id, `${year}-${month}-${date}`).then((res) => {
            setDailySales(res);
            // console.log("Get Daily sales : ", res);
            Navigate('/ministore/sales/report');
        })
    }

    useEffect(() => {
        if (selectedDate && selectedShop) {
            getDailySales();
        }
    }, [selectedDate])

    function uploadSales (shopId : number , data : {
        shopId: number;
        storeName: string;
        date: string;
        totalSales: number;
      }){
        addSales(shopId , data).then((res)=>{
            alert(res.message);
        })
    }

    return <ShopContext.Provider value={{ uploadSales , getMiniStores, loading, shops,selectedShop ,  setSelectedShop, miniShopsData, selectedDate, setSelectedDate, monthSales, dailySales }} >
        {children}
    </ShopContext.Provider>
}
export default withUser(ShopProvider);