import * as React from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

function formatTime24(hour: number, minute: number) {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function formatTime12(hour: number, minute: number) {
    const period = hour < 12 ? 'AM' : 'PM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}

function getTimeIntervals(format: '24' | '12') {
    return Array.from({ length: 24 * 4 }, (_, i) => {
        const hour = Math.floor(i / 4);
        const minute = (i % 4) * 15;
        return format === '24' ? formatTime24(hour, minute) : formatTime12(hour, minute);
    });
}

interface TimePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    error?: string;
    id?: string;
    format?: '24' | '12';
}

export function TimePicker({ value, onChange, label, error, id, format = '24' }: TimePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [timeFormat, setTimeFormat] = React.useState<'24' | '12'>(format);

    const TIME_INTERVALS = React.useMemo(() => getTimeIntervals(timeFormat), [timeFormat]);

    // Convert value to display format if needed
    const displayValue = React.useMemo(() => {
        if (!value) return '';
        if (timeFormat === '24') return value;
        // Convert "HH:mm" to 12-hour format for display
        const [h, m] = value.split(':');
        return formatTime12(Number(h), Number(m));
    }, [value, timeFormat]);

    return (
        <div>
            {label && (
                <label htmlFor={id} className="mb-1 block text-sm font-medium">
                    {label}
                </label>
            )}
            <div className="mb-1 flex items-center gap-2">
                <span className="text-xs text-gray-500">Format:</span>
                <button
                    type="button"
                    className={`rounded px-2 py-1 text-xs ${timeFormat === '24' ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
                    onClick={() => setTimeFormat('24')}
                >
                    24h
                </button>
                <button
                    type="button"
                    className={`rounded px-2 py-1 text-xs ${timeFormat === '12' ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
                    onClick={() => setTimeFormat('12')}
                >
                    12h
                </button>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={`w-full justify-start bg-white text-left font-normal hover:bg-white hover:text-black ${!value ? 'text-muted-foreground' : ''} ${error ? 'border-red-500' : ''}`}
                        id={id}
                        type="button"
                    >
                        {displayValue || 'Pick a time'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="max-h-64 w-40 overflow-y-auto p-0">
                    <ul>
                        {TIME_INTERVALS.map((time) => (
                            <li key={time}>
                                <button
                                    type="button"
                                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 hover:text-black ${displayValue === time ? 'bg-blue-100 font-semibold' : ''}`}
                                    onClick={() => {
                                        // Always store value as "HH:mm"
                                        let val = time;
                                        if (timeFormat === '12') {
                                            // Convert 12h format back to 24h "HH:mm"
                                            const match = time.match(/^(\d+):(\d{2}) (AM|PM)$/);
                                            if (match) {
                                                const [, h, m, period] = match;
                                                let hour = Number(h) % 12;
                                                if (period === 'PM') hour += 12;
                                                val = `${hour.toString().padStart(2, '0')}:${m}`;
                                            }
                                        }
                                        onChange(val);
                                        setOpen(false);
                                    }}
                                >
                                    {time}
                                </button>
                            </li>
                        ))}
                    </ul>
                </PopoverContent>
            </Popover>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}
