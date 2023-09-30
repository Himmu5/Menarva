import { FC, FormEvent, useState } from 'react'
import Calendar from 'react-calendar';
import { withShop } from '../../HOC/withShop';
import { Shop } from '../../Typings/Shop';
import Input from '../UI-Components/Input';
import { BiRupee } from 'react-icons/bi'
import { Button } from '@mui/material';

type P = {
  selectedShop: Shop;
  uploadSales: (shopId: number, data: {
    shopId: number;
    storeName: string;
    date: string;
    totalSales: number;
  }) => void
}

const UploadSales: FC<P> = ({ selectedShop, uploadSales }) => {
  console.log("selected Shop :", selectedShop);

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
  const [salesAmount, setSalesAmount] = useState("0.00");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedDate && salesAmount) {
      const date = `${selectedDate.getFullYear()}/${(selectedDate.getMonth() < 10) ? "0" + selectedDate.getMonth() : selectedDate.getMonth()}/${selectedDate.getDate()}`;
      const data = {
        shopId: selectedShop.id,
        storeName: selectedShop.name,
        date,
        totalSales: +salesAmount
      }
      console.log("selectedShop : ", selectedShop.id);
      uploadSales(selectedShop.id, data)
      setSalesAmount("0.00");
      setSelectedDate(undefined);
    }
  }

  return <div>

    <div className='flex justify-center flex-col items-center min-h-[70vh]'>
      <form className='flex flex-col items-start space-y-5 ' onSubmit={submit} >
        <h1 className='my-3 font-bold text-xl '>Upload Daily Sales for <span className='text-blue-500'> {selectedShop.name}</span></h1>
        {/* <form action=""></form> */}
        {showCalendar && <h1 onClick={() => setShowCalendar(!showCalendar)} className='mb-4 p-2 border rounded-md shadow-md hover:scale-105 cursor-pointer '>Pick a date to upload sales</h1>}

        {
          selectedDate && <div className=' py-2 '>
            Selected Date : {selectedDate?.toLocaleString()}
          </div>
        }
        {!showCalendar && <Calendar
          className={"max-w-sm"}
          value={selectedDate}
          onChange={handleDateChange} />}
        <div className='flex items-center relative '>
          <BiRupee size={25} className=" left-2 text-gray-400 absolute " />
          <Input value={salesAmount} placeholder="Enter the Today's sales " onChange={(e) => setSalesAmount(e.target.value)} />
        </div>

        <Button variant='contained' type='submit' children=" Upload Sales " />
      </form>
    </div>
  </div >
}
export default withShop(UploadSales);