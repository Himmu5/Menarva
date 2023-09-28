import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { withShop } from '../../HOC/withShop';

type P = {
  selectedDate: Date;
  setSelectedDate: (s: Date) => void;
  monthSales: { result: { pending: Date[], approved: Date[], rejected: Date[] } }
}

const CalendarWithHighlights: FC<P> = ({ setSelectedDate, selectedDate, monthSales }) => {

  console.log("Date : ", setSelectedDate);

  const highlightDates: Date[] = [
    new Date('2023-09-01'),
    new Date('2023-09-06'),
    new Date('2023-09-10')
    // Add more highlighted dates here
  ];

  const panding = [] as Date[]
  const rejected = [] as Date[]
  const approved = [] as Date[]

  monthSales.result.pending.forEach((d) => {
    panding.push(new Date(d));
  })
  monthSales.result.rejected.forEach((d) => {
    rejected.push(new Date(d));
  })
  monthSales.result.approved.forEach((d) => {
    approved.push(new Date(d));
  })

  const handleDateChange = (date: any) => {
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

  return (
    <div className='max-w-7xl mx-auto flex flex-col'>
      <Link to={'/'} className='w-fit'><FaAngleLeft size={25} className=" w-fit text-xl mt-4 " /></Link>
      <div className='flex items-center justify-center min-h-[80vh]'>

        <Calendar
          className={"max-w-sm"}
          value={selectedDate}
          onChange={handleDateChange}
          tileClassName={({ date }) => {
            return isDatePandingHighlighted(date) ? 'h-12 rounded-full bg-yellow-500' : isDateRejectedHighlighted(date) ? " h-12 rounded-full bg-red-500 " : isDateApprovedHighlighted(date) ? " h-12 rounded-full bg-green-500 " :"  ";
          }}
        />
      </div>
    </div>
  );
}

export default withShop(CalendarWithHighlights);
