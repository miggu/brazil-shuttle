import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface CalendarPickerProps {
  onDateSelect?: (date: Date) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ onDateSelect }) => {
  // State now holds a moment object for the current displayed month, defaulting to 90 days from now
  const [currentDate, setCurrentDate] = useState(moment().add(90, 'days'));
  // Selected date state, default to the day 90 days from now
  const [selectedDate, setSelectedDate] = useState<string | null>(moment().add(90, 'days').format('YYYY-MM-DD'));

  // Trigger onDateSelect on mount so app knows the default
  useEffect(() => {
    onDateSelect?.(moment().add(90, 'days').toDate());
  }, []);

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfWeek = currentDate.clone().startOf('month').day(); // 0-6 (Sun-Sat)

  const days = [];

  // Padding for previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(<div key={`pad-${i}`} className="aspect-square"></div>);
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    // Create a moment object for this specific day
    const dateMoment = currentDate.clone().date(d);
    const dateString = dateMoment.format('YYYY-MM-DD');
    const isSelected = selectedDate === dateString;
    const isToday = moment().format('YYYY-MM-DD') === dateString;

    days.push(
      <div
        key={d}
        onClick={() => {
          setSelectedDate(dateString);
          // Return native Date object for compatibility
          onDateSelect?.(dateMoment.toDate());
        }}
        className={`
                    p-2 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors
                    ${isSelected ? 'bg-accent text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
                    ${isToday && !isSelected ? 'border border-accent text-accent' : ''}
                `}
      >
        {d}
      </div>
    );
  }

  const prevMonth = () => setCurrentDate(prev => prev.clone().subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(prev => prev.clone().add(1, 'month'));

  return (
    <div className="w-full h-full min-h-[300px] bg-white rounded-xl shadow-sm p-4 relative select-none">
      <h3 className="text-gray-700 font-semibold mb-4">Wished day for travel</h3>
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors w-8 h-8 flex items-center justify-center"
        >
          ←
        </button>
        <div className="font-semibold text-gray-800">
          {currentDate.format('MMMM YYYY')}
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
