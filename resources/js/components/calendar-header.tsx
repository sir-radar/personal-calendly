import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
    currentDate: dayjs.Dayjs;
    changeMonth: (direction: 'prev' | 'next') => void;
}

export default function CalendarHeader({ currentDate, changeMonth }: CalendarHeaderProps) {
    return (
        <div className="flex items-center justify-between bg-white p-4 shadow">
            <button onClick={() => changeMonth('prev')}>
                <ChevronLeft />
            </button>
            <div className="text-2xl font-semibold">{currentDate.format('MMMM YYYY')}</div>
            <button onClick={() => changeMonth('next')}>
                <ChevronRight />
            </button>
        </div>
    );
}
