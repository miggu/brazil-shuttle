import React, { useState } from 'react';

interface CalendarPickerProps {
  onDateSelect?: (date: Date) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Adjust for Monday start if needed, but standard US is Sunday=0. Let's stick to Sunday=0 for simplicity unless requested.
  // Actually, reference designs often use Monday start for EU, but let's stick to standard JS for now (Sun=0).

  const days = [];
  // Padding for previous month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`pad-${i}`} className="aspect-square"></div>);
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const isSelected = selectedDate?.toDateString() === date.toDateString();
    const isToday = new Date().toDateString() === date.toDateString();

    days.push(
      <div
        key={d}
        onClick={() => {
          setSelectedDate(date);
          onDateSelect?.(date);
        }}
        className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors
                    ${isSelected ? 'bg-accent text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
                    ${isToday && !isSelected ? 'border border-accent text-accent' : ''}
                `}
      >
        {d}
      </div>
    );
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="card w-full max-w-[320px] mx-auto p-4 select-none">
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors w-8 h-8 flex items-center justify-center"
        >
          ←
        </button>
        <div className="font-semibold text-gray-800">
          {monthNames[month]} {year}
        </div>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors w-8 h-8 flex items-center justify-center"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-xs font-bold text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days}
      </div>
    </div>
  );
};

export default CalendarPicker;
