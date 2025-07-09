import Calendar from '@/components/calendar';
import AppLayout from '@/layouts/app-layout';
import { CalendarEventsProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Home({ events }: CalendarEventsProps) {
    return (
        <>
            <Head title="Home" />
            <AppLayout>
                <Calendar events={events} />
            </AppLayout>
        </>
    );
}
