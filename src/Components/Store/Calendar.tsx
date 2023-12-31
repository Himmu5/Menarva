import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import BackButton from '../UI-Components/BackButton';
import { withAlert, withShop, withSops } from '../../HOC/withProvider';
import { SopCalendar } from '../../Typings/sops';
import { AlertType } from '../../Typings/Alert';
import { MiniShop } from '../../Typings/Shop';

type P = {
  selectedDate: Date;
  setSelectedDate: (s: Date) => void;
  monthSales: { id: number, result: { pending: Date[], approved: Date[], rejected: Date[] } };
  setChangeMonth: (d: Date) => void;
  changeMonth: Date;
  Sales: boolean;
  sopCalendar: SopCalendar;
  setSopDate: (s: Date) => void;
  Navigate: () => void;
  setAlert: (alert: AlertType) => void;
  miniShop: MiniShop
}

const CalendarWithHighlights: FC<P> = ({miniShop , setSopDate, changeMonth, setSelectedDate, monthSales, setChangeMonth, Sales, sopCalendar, setAlert }) => {
  const panding = [] as Date[]
  const rejected = [] as Date[]
  const approved = [] as Date[]
  const Navigate = useNavigate();

  if (Sales === true) {
    sopCalendar.completed.forEach((d) => {
      approved.push(new Date(d));
    })
    sopCalendar.inComplete.forEach((d) => {
      // console.log(new Date(d));

      panding.push(new Date(d))
    })

  }
  else {

    if (monthSales.id !== 1033) {
      monthSales.result?.pending.forEach((d) => {
        panding.push(new Date(d));
      })
      monthSales.result?.rejected.forEach((d) => {
        rejected.push(new Date(d));
      })
      monthSales.result?.approved.forEach((d) => {
        approved.push(new Date(d));
      })
    }
  }


  console.log("sales  : ", Sales);


  const handleDateChange = (date: any) => {
    // console.log("Change calendar");
    if (Sales === true) {
      console.log("Hello Bro");

      const currentDate = new Date();
      if ((+currentDate.getDate() < +date.getDate()) || (+currentDate.getMonth() < +date.getMonth())) {
        setAlert({ message: "Please select previous date from current Date", type: "error" })
      }
      else {
        setSopDate(date);
        Navigate("/SOP");
      }
    }
    else {
      if (Array.isArray(date)) {
        setSelectedDate(date[0]);
      } else {
        setSelectedDate(date);
      }
    }
  };

  const isDatePandingHighlighted = (date: Date) =>
    panding.some((highlightedDate) =>
      date.toDateString() === highlightedDate.toDateString()
    );

  const isDateRejectedHighlighted = (date: Date) =>
    rejected.some((highlightedDate) =>
      date.toDateString() === highlightedDate.toDateString()
    );

  const isDateApprovedHighlighted = (date: Date) =>
    approved.some((highlightedDate) =>
      date.toDateString() === highlightedDate.toDateString()
    );


  function onchange(e: any) {
    // console.log("change",e.activeStartDate)
    setChangeMonth(e.activeStartDate);
  }

  return (
    <div className='max-w-7xl mx-auto flex flex-col'>
      <div className='flex items-center justify-between px-4'>
        <div className='w-fit px-3' onClick={() => Navigate(-1)}><BackButton /></div>
        <div className='flex items-center gap-2'> <p className='font-bold '>Mini Shop :</p> <p className='text-blue-800'> {miniShop.name}</p></div>

      </div>
      <div className='flex items-center justify-center min-h-[80vh]'>

        <Calendar
          onActiveStartDateChange={onchange}
          className={"max-w-sm"}
          value={changeMonth}
          onChange={handleDateChange}
          tileClassName={({ date }) => {
            return isDatePandingHighlighted(date) ? 'h-12 rounded-full bg-yellow-500' : isDateRejectedHighlighted(date) ? " h-12 rounded-full bg-red-500 " : isDateApprovedHighlighted(date) ? " h-12 rounded-full bg-green-500 " : "  ";
          }}
        />
      </div>
    </div>
  );
}

export default withAlert(withSops(withShop(CalendarWithHighlights)));
