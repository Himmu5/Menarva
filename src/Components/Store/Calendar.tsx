import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaAngleLeft } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { withShop } from '../../HOC/withShop';
import BackButton from '../UI-Components/BackButton';

type P = {
  selectedDate: Date;
  setSelectedDate: (s: Date) => void;
  monthSales: { id: number, result: { pending: Date[], approved: Date[], rejected: Date[] } }
}

const CalendarWithHighlights: FC<P> = ({ setSelectedDate, selectedDate, monthSales }) => {
  console.log("Month Sales : ", monthSales);
  const panding = [] as Date[]
  const rejected = [] as Date[]
  const approved = [] as Date[]
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

  const handleDateChange = (date: any) => {
    console.log("Change calendar");
    if (Array.isArray(date)) {
      setSelectedDate(date[0]);
    } else {
      setSelectedDate(date);
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

  function handleViewChange(date: any) {
    if (Array.isArray(date)) {
      setSelectedDate(date[0]);
    } else {
      setSelectedDate(date);
    }
  }
  const Navigate = useNavigate();

  return (
    <div className='max-w-7xl mx-auto flex flex-col'>
      <div className='w-fit px-3' onClick={() => Navigate(-1)}><BackButton /></div>

      <div className='flex items-center justify-center min-h-[80vh]'>

        <Calendar
          className={"max-w-sm"}
          value={selectedDate}
          onClickMonth={handleViewChange}
          onChange={handleDateChange}
          tileClassName={({ date }) => {
            return isDatePandingHighlighted(date) ? 'h-12 rounded-full bg-yellow-500' : isDateRejectedHighlighted(date) ? " h-12 rounded-full bg-red-500 " : isDateApprovedHighlighted(date) ? " h-12 rounded-full bg-green-500 " : "  ";
          }}
        />
      </div>
    </div>
  );
}

export default withShop(CalendarWithHighlights);
