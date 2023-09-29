import { FC, ReactNode, useEffect, useState } from 'react'
import { getShops, getminiStore } from '../../Axios/store';
import { MiniShop, Shop } from '../../Typings/Shop';
import { ShopContext } from '../../Context/Store';
import { getDailySale, getMonthSales } from '../../Axios/sales';
import { useNavigate } from 'react-router-dom';
type P = {
    children: ReactNode
}
const ShopProvider: FC<P> = ({ children }) => {
    const Navigate = useNavigate();
    const [shops, setShops] = useState<Shop[]>();
    const [selectedShop, setSelectedShop] = useState<Shop>();
    const [miniShopsData, setMiniShops] = useState<MiniShop>();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [monthSales, setmonthSales] = useState();

    console.log("Selected Date : ", monthSales);

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

    return <ShopContext.Provider value={{ shops, setSelectedShop, miniShopsData, selectedDate, setSelectedDate, monthSales , dailySales}} >
        {children}
    </ShopContext.Provider>
}
export default ShopProvider;