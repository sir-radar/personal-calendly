import Calendar from '@/components/calendar';
import AppLayout from '@/layouts/app-layout';
// import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppLayout>
            <Calendar />
        </AppLayout>
    );
}
