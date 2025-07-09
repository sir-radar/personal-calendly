export interface CalendarEventsProps {
    events: CalendarEvent[];
}

export type CalendarEvent = {
    id?: string;
    name: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    recurrent: boolean;
    recurrent_type: 'daily' | 'weekly' | 'monthly';
    include_weekends: boolean;
};
