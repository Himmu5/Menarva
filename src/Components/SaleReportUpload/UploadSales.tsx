import { FC, FormEvent, useState } from 'react'
import Calendar from 'react-calendar';
import { MiniShop, Shop } from '../../Typings/Shop';
import Input from '../UI-Components/Input';
import { BiRupee } from 'react-icons/bi'
import { Button } from '@mui/material';
import ImageUpload from './ImageUpload';
import axiosInstance from '../../Axios/axios';
import { UserConfig } from '../../Typings/User';
import { AlertType } from '../../Typings/Alert';
import 'react-calendar/dist/Calendar.css';
import { withAlert, withShop, withUser } from '../../HOC/withProvider';
import BackButton from '../UI-Components/BackButton';
import { useNavigate } from 'react-router-dom';

type P = {
  selectedShop: Shop;
  uploadSales: (shopId: number, data: {
    shopId: number;
    shopName: string;
    date: number;
    totalSales: number;
  }) => void;
  shopConfig: UserConfig;
  formatDateToYYYYMMDD: (d: Date) => string;
  setAlert: (s: AlertType) => void;
  miniShop: MiniShop
}

const UploadSales: FC<P> = ({ selectedShop, uploadSales, shopConfig, setAlert, miniShop }) => {
  console.log("selected Shop :", selectedShop);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // const [ImageUploaded, setImageUploaded] = useState(false)
  console.log("Config :", shopConfig);


  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateChange = (date: any) => {
    if (Array.isArray(date)) {
      setShowCalendar(!showCalendar)
      setSelectedDate(date[0]);
    } else {
      setShowCalendar(!showCalendar)
      setSelectedDate(date);
    }
  };
  const [showCalendar, setShowCalendar] = useState(true);
  const [salesAmount, setSalesAmount] = useState("0");
  const Navigate = useNavigate();

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedDate && salesAmount) {
      const longDate = selectedDate as any * 1
      const data = {
        shopId: selectedShop.id,
        shopName: selectedShop.name,
        date: longDate,
        totalSales: +salesAmount
      }
      console.log("selectedShop : ", selectedShop.id);
      uploadSales(selectedShop.id, data)
      setSalesAmount("0.00");
      setSelectedDate(undefined);
      // setImageUploaded(false);
    }
  }



  function UploadImage(salesImage: FormData) {
    console.log("file : ", salesImage);
    if (selectedDate) {

      const longDate = selectedDate as any * 1
      axiosInstance.post('/api/v1/accounting/upload_sales_image/' + selectedShop.id + `?date=${longDate}`, salesImage, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } }).then((res) => {
        console.log("Image : ", res)
        setSelectedImage(null);
        setAlert({ type: res.data.code === 1029 ? "error" : "success", message: res.data.message });

      })
    } else {
      setAlert({ type: "error", message: "Please select a date" });
    }
  }
  const tileClassName = (p: { date: Date, view: string }) => {
    if (p.view === 'month' && p.date.toDateString() === new Date().toDateString()) {
      return 'current-date'; // You can define this class in your CSS for the blue circle style
    }
    return '';
  };

  return <div>
    <div className='flex items-center px-4 gap-2 justify-between '>
      <div className='w-fit px-3 py-5 ' onClick={() => Navigate(-1)}><BackButton /></div>
      <div className='flex items-center gap-2'> <p className='font-bold '>Mini Shop :</p> <p className='text-blue-800'> {miniShop.name}</p></div>
    </div>

    <div className='flex justify-center flex-col items-center min-h-[70vh]'>

      <form className='flex flex-col items-start space-y-5 ' onSubmit={submit} >
        <h1 className='my-3 font-bold text-xl '>Upload Daily Sales for <span className='text-blue-500'> {miniShop?.name}</span></h1>
        {/* <form action=""></form> */}
        {showCalendar && <h1 onClick={() => setShowCalendar(!showCalendar)} className='mb-4 p-2 border rounded-md shadow-md hover:scale-105 cursor-pointer '>Pick a date to upload sales</h1>}

        {
          selectedDate && <div className=' py-2 '>
            Selected Date : {selectedDate?.toLocaleString()}
          </div>
        }

        {!showCalendar && <Calendar
          className={" max-w-sm "}
          value={selectedDate}
          tileClassName={tileClassName}
          onChange={handleDateChange} />}
        <div className='flex items-center relative '>
          <BiRupee size={25} className=" left-2 text-gray-400 absolute " />
          <Input type='number' value={salesAmount} placeholder="Enter the Today's sales " onChange={(e) => { +e.target.value >= 0 && setSalesAmount(e.target.value) }} />
        </div>


        <Button variant='contained' type='submit' children=" Upload Sales " />
      </form>
      {shopConfig.ACCOUNTING.IMAGE_UPLOAD && <ImageUpload UploadImage={UploadImage} selectedImage={selectedImage!} setSelectedImage={setSelectedImage} />}
    </div>
  </div >
}
export default withAlert(withUser(withShop(UploadSales)));