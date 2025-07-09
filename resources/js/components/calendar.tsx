import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'sonner';

import { CalendarEvent, CalendarEventsProps } from '../types';
import CalendarGrid from './calendar-grid';
import CalendarHeader from './calendar-header';
import EventModal from './event-modal';

export default function Calendar({ events: storedEvents }: CalendarEventsProps) {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [events, setEvents] = useState<CalendarEvent[]>(storedEvents);
    const [errors, setErrors] = useState<Record<string, string>>({});

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
        setEventModalOpen(true);
    };

    const handleEventSubmit = async (data: CalendarEvent) => {
        router.post('/events', data, {
            preserveScroll: true,
            preserveState: true,
            only: ['events'],
            onSuccess: ({ props }) => {
                const events = props.events as CalendarEvent[];
                setEvents([...events]);
                setEventModalOpen(false);
                toast.success('Event has been created', {
                    description: `${data.start_date ? dayjs(data.start_date).format('dddd, MMMM D, YYYY') : ''}`,
                });
            },
            onError: (errors) => {
                toast.error('Event creation failed');
                setErrors(errors);
            },
        });
    };

    const getEventsForDate = (date: dayjs.Dayjs) =>
        events?.filter((event) => {
            const start = dayjs(event.start_date);
            const end = event.end_date ? dayjs(event.end_date) : undefined;

            if (!event.recurrent) {
                return date.isSame(start, 'day') || (!!end && (date.isSame(end, 'day') || (date.isAfter(start, 'day') && date.isBefore(end, 'day'))));
            }

            if (date.isBefore(start, 'day')) return false;
            if (end && date.isAfter(end, 'day')) return false;
            if (!event.include_weekends && (date.day() === 0 || date.day() === 6)) return false;

            switch (event.recurrent_type) {
                case 'daily':
                    return true;
                case 'weekly':
                    return date.day() === start.day();
                case 'monthly':
                    return date.date() === start.date();
                default:
                    return false;
            }
        });

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-gray-100 text-gray-700">
            <CalendarHeader currentDate={currentDate} changeMonth={changeMonth} />
            <CalendarGrid currentDate={currentDate} days={days} getEventsForDate={getEventsForDate} openEventModal={openEventModal} />
            {eventModalOpen && (
                <EventModal selectedDate={selectedDate} handleSubmit={handleEventSubmit} onClose={() => setEventModalOpen(false)} errors={errors} />
            )}
        </div>
    );
}
