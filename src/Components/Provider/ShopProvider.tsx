import { FC, ReactNode, useEffect, useState } from 'react'
import { getShops, getminiStore } from '../../Axios/store';
import { MiniShop, Shop } from '../../Typings/Shop';
import { ShopContext } from '../../Context/Store';
import { addSales, getDailySale, getMonthSales } from '../../Axios/sales';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios/axios';
import { UserClass } from '../../Typings/User';
import { AlertType } from '../../Typings/Alert';
import { Manager } from '../../Typings/Manager';
import { withAlert, withUser } from '../../HOC/withProvider';
import { checkResponse } from '../../ErrorHandling/ResponseCheck';
type P = {
    children: ReactNode;
    shopId: number,
    user: UserClass;
    setAlert: (s: AlertType) => void
    accessToken: string;
}
const ShopProvider: FC<P> = ({ children, shopId, user, setAlert, accessToken }) => {
    const Navigate = useNavigate();
    const [shops, setShops] = useState<{
        [key: number]: {
            store: Shop;
            Managers: Manager[];
        };
    }>();
    const [miniShop, setMiniShop] = useState<MiniShop>();
    const [selectedShop, setSelectedShop] = useState<Shop>();
    const [miniShopsData, setMiniShops] = useState<MiniShop>();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [monthSales, setmonthSales] = useState();
    const [changeMonth, setChangeMonth] = useState(new Date());
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (user?.role === 1) {
            updateShop();
        }
    }, [user])
    function updateShop() {
        getShops(user, accessToken).then((res: any) => {
            setShops(res);
        })
    }

    useEffect(() => {
        if (selectedShop || user?.role === 2) {
            getMiniStores(1, selectedShop?.name!, accessToken);
        }

    }, [selectedShop])

    useEffect(() => {

        getMonthSale();

    }, [miniShop, changeMonth.getMonth()])
    // const [ loading , setLoading ] = useState(false);

    function getMonthSale() {
        if (miniShop && user?.role === 1) {
            setLoading(true);
            getMonthSales(miniShop?.id!, changeMonth.getFullYear(), changeMonth.getMonth(), selectedShop?.name!, accessToken).then((res) => {
                setmonthSales(res);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            })
        }
    }

    function getMiniStores(id: number, selectedShop: string, accessToken: string) {
        getminiStore(id, selectedShop, accessToken).then((res) => {
            setMiniShops(res)
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }

    const [dailySales, setDailySales] = useState();
    function getDailySales() {
        if (user?.role === 1) {
            const longDate = selectedDate! as any * 1

            getDailySale(miniShop!.id, longDate, selectedShop?.name!, accessToken).then((res) => {
                setDailySales(res);
                Navigate('/ministore/sales/report');
            })
        }
    }
    useEffect(() => {
        if (selectedDate && selectedShop) {
            getDailySales();
        }
    }, [selectedDate])

    function uploadSales(shopId: number, data: {
        miniShopId: number;
        date: number;
        totalSales: number;
    }) {
        addSales(shopId, data, accessToken).then((res) => {
            checkResponse(res, setAlert);
        }).catch((err) => {
            setAlert({ message: err.response.status === 403 ? "You are not allowed to upload sales please contact admin" : err.message, type: "error" });
        })
    }

    return <ShopContext.Provider value={{ updateShop, setMiniShop, miniShop, changeMonth, getMonthSale, setChangeMonth, uploadSales, getMiniStores, loading, setLoading, shops, selectedShop, setSelectedShop, miniShopsData, selectedDate, setSelectedDate, monthSales, dailySales }} >
        {children}
    </ShopContext.Provider>
}
export default withAlert(withUser(ShopProvider));