import clsx from 'clsx';
import dayjs from 'dayjs';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CalendarEvent } from '../types';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
    currentDate: dayjs.Dayjs;
    days: dayjs.Dayjs[];
    getEventsForDate: (date: dayjs.Dayjs) => CalendarEvent[];
    openEventModal: (date: dayjs.Dayjs) => void;
}

export default function CalendarGrid({ currentDate, days, getEventsForDate, openEventModal }: CalendarGridProps) {
    const [hoveredDate, setHoveredDate] = useState<dayjs.Dayjs | null>(null);
    return (
        <div className="grid flex-grow grid-cols-7 gap-px px-2 py-4">
            {daysOfWeek.map((day) => (
                <div key={day} className="text-center font-bold text-gray-700">
                    {day}
                </div>
            ))}

            {days.map((day) => {
                const isCurrentMonth = day.isSame(currentDate, 'month');
                const isToday = day.isSame(dayjs(), 'day');
                const isHovered = hoveredDate?.isSame(day, 'day');
                const dayEvents = getEventsForDate(day);
                return (
                    <div
                        key={day.toISOString()}
                        onMouseEnter={() => setHoveredDate(day)}
                        onMouseLeave={() => setHoveredDate(null)}
                        className={clsx(
                            'group relative flex min-h-[100px] flex-col items-center rounded-lg border p-2',
                            isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
                            isToday && 'border-blue-500',
                        )}
                    >
                        <div className="self-start font-semibold">{day.date()}</div>

                        <div className="mt-1 w-full space-y-1 text-left text-xs">
                            {dayEvents.map((event) => (
                                <div key={event.id} className="truncate rounded bg-blue-100 px-1 py-0.5 text-blue-800">
                                    {event.name}
                                </div>
                            ))}
                        </div>

                        {isHovered && (
                            <button
                                onClick={() => openEventModal(day)}
                                className="absolute top-1 right-1 rounded-full bg-blue-500 p-1 text-white hover:bg-blue-600"
                            >
                                <Plus size={12} />
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
