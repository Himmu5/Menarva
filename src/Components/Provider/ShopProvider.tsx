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
type P = {
    children: ReactNode;
    shopId: number,
    user: UserClass;
    setAlert: (s: AlertType) => void
    accessToken : string;
}
const ShopProvider: FC<P> = ({ children, shopId, user, setAlert , accessToken }) => {
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

    // console.log("monthSales  : ", monthSales);

    useEffect(() => {
        // console.log("User : ", user);
        
        if (user?.role === 1) {
            getShops(user , accessToken).then((res: any) => {
                setShops(res);
            })
        }
    }, [user])

    useEffect(() => {
        // if (selectedShop) {
            getMiniStores(1 ,  accessToken);
        // }

    }, [selectedShop, user])

    useEffect(() => {
        if (user && shopId) {
            axiosInstance.get("/shops/" + shopId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    "ngrok-skip-browser-warning": 69420,
                }
            }).then((res) => {
                // console.log("Res : ",res.data.result);
                setSelectedShop(res.data.result);
            })
        }
    }, [shopId, user])

    useEffect(() => {

        getMonthSale();

    }, [miniShop, changeMonth.getMonth()])
    // const [ loading , setLoading ] = useState(false);

    function getMonthSale() {
        if (miniShop && user?.role === 1) {
            setLoading(true);
            console.log("miniShop : ", miniShop)
            getMonthSales(miniShop?.id!, changeMonth.getFullYear(), changeMonth.getMonth() , accessToken).then((res) => {
                setmonthSales(res);
                setLoading(false);
            }).catch(()=>{
                setLoading(false);
            })
        }
    }

    function getMiniStores(id: number , accessToken : string) {
        getminiStore(id , accessToken).then((res) => {
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
            const longDate = selectedDate! as any * 1

            getDailySale(miniShop!.id, longDate , accessToken).then((res) => {
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
        miniShopId: number;
        date: number;
        totalSales: number;
    }) {
        addSales(shopId, data , accessToken).then((res) => {
            setAlert({ message: res.message, type: "success" });
        }).catch((err) => {
            setAlert({ message: err.response.status === 403 ? "You are not allowed to upload sales please contact admin" : err.message, type: "error" });
        })
    }

    return <ShopContext.Provider value={{ setMiniShop, miniShop, changeMonth, getMonthSale, setChangeMonth, uploadSales, getMiniStores, loading, setLoading , shops, selectedShop, setSelectedShop, miniShopsData, selectedDate, setSelectedDate, monthSales, dailySales }} >
        {children}
    </ShopContext.Provider>
}
export default withAlert(withUser(ShopProvider));