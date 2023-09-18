import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom';


function CalendarWithHighlights() {


  const highlightDates: Date[] = [
    new Date('2023-09-01'),
    new Date('2023-09-06'),
    new Date('2023-09-10')
    // Add more highlighted dates here
  ];

  const isDateHighlighted = (date: Date) =>
    highlightDates.some((highlightedDate) =>
      date.toDateString() === highlightedDate.toDateString()
    );

  return (
    <div className='max-w-7xl mx-auto flex flex-col'>
      <Link to={'/'} className='w-fit'><FaAngleLeft size={25} className=" w-fit text-xl mt-4 " /></Link>
      <div className='flex items-center justify-center min-h-[80vh]'>

        <Calendar
          className={"max-w-sm"}
          tileClassName={({ date }) => {
            return isDateHighlighted(date) ? 'h-12 rounded-full bg-green-500' : '';
          }}
        />
      </div>
    </div>
  );
}

export default CalendarWithHighlights;
