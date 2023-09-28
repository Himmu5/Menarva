import { FC, ReactNode, useEffect, useState } from 'react'
import { getShops, getminiStore } from '../../Axios/store';
import { MiniShop, Shop } from '../../Typings/Shop';
import { ShopContext } from '../../Context/Store';
import { getMonthSales } from '../../Axios/sales';
type P = {
    children: ReactNode
}
const ShopProvider: FC<P> = ({ children }) => {

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


    return <ShopContext.Provider value={{ shops, setSelectedShop, miniShopsData, selectedDate, setSelectedDate, monthSales }} >
        {children}
    </ShopContext.Provider>
}
export default ShopProvider;