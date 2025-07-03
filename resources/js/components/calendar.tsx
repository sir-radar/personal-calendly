import clsx from 'clsx';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React, { useState } from 'react';
import Modal from './modal';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarEvent {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    repeat: boolean;
}

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [hoveredDate, setHoveredDate] = useState<dayjs.Dayjs | null>(null);
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        repeat: false,
    });

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startDate = startOfMonth.startOf('week');
    const endDate = endOfMonth.endOf('week');

    const days = [];
    let date = startDate;
    while (date.isBefore(endDate, 'day') || date.isSame(endDate, 'day')) {
        days.push(date);
        date = date.add(1, 'day');
    }

    const changeMonth = (direction: 'prev' | 'next') => {
        setCurrentDate((prev) => (direction === 'prev' ? prev.subtract(1, 'month') : prev.add(1, 'month')));
    };

    const openEventModal = (day: dayjs.Dayjs) => {
        setSelectedDate(day);
        setFormData({
            name: '',
            startDate: day.format('YYYY-MM-DD'),
            endDate: day.format('YYYY-MM-DD'),
            startTime: '',
            endTime: '',
            repeat: false,
        });
        setEventModalOpen(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEventSubmit = () => {
        const newEvent: CalendarEvent = {
            id: Date.now(),
            ...formData,
        };
        setEvents((prev) => [...prev, newEvent]);
        setEventModalOpen(false);
    };

    const getEventsForDate = (date: dayjs.Dayjs) => events.filter((event) => dayjs(event.startDate).isSame(date, 'day'));

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-gray-100 text-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 shadow">
                <button onClick={() => changeMonth('prev')}>
                    <ChevronLeft />
                </button>
                <div className="text-2xl font-semibold">{currentDate.format('MMMM YYYY')}</div>
                <button onClick={() => changeMonth('next')}>
                    <ChevronRight />
                </button>
            </div>

            {/* Grid */}
            <div className="grid flex-grow grid-cols-7 gap-px px-2 py-4">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-center font-bold text-gray-700">
                        {day}
                    </div>
                ))}

                {days.map((day, i) => {
                    const isCurrentMonth = day.isSame(currentDate, 'month');
                    const isToday = day.isSame(dayjs(), 'day');
                    const isHovered = hoveredDate?.isSame(day, 'day');
                    const dayEvents = getEventsForDate(day);

                    return (
                        <div
                            key={i}
                            onMouseEnter={() => setHoveredDate(day)}
                            onMouseLeave={() => setHoveredDate(null)}
                            className={clsx(
                                'group relative flex min-h-[100px] flex-col items-center rounded-lg border p-2',
                                isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
                                isToday && 'border-blue-500',
                            )}
                        >
                            <div className="self-start font-semibold">{day.date()}</div>

                            {/* Events */}
                            <div className="mt-1 w-full space-y-1 text-left text-xs">
                                {dayEvents.map((event) => (
                                    <div key={event.id} className="truncate rounded bg-blue-100 px-1 py-0.5 text-blue-800">
                                        {event.name}
                                    </div>
                                ))}
                            </div>

                            {/* Add Button */}
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

            {/* Modal */}
            {eventModalOpen && <Modal />}
        </div>
    );
}
