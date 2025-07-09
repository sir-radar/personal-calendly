import { CalendarEvent } from '@/types';
import { useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import dayjs from 'dayjs';
import { FormEvent, useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { TimePicker } from './time-picker';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface EventModalProps {
    selectedDate: dayjs.Dayjs | null;
    handleSubmit: (data: CalendarEvent) => void;
    onClose: () => void;
    errors?: Record<string, string>;
}

export default function EventModal({ selectedDate, handleSubmit, onClose, errors }: EventModalProps) {
    const { data, setData } = useForm<CalendarEvent>({
        name: '',
        start_date: selectedDate ? format(selectedDate.toDate(), 'yyyy-MM-dd') : '',
        end_date: '',
        start_time: '',
        end_time: '',
        recurrent: false,
        recurrent_type: 'daily',
        include_weekends: false,
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const errors: Record<string, string> = {};
        if (!data.name.trim()) errors.name = 'Event name is required';
        if (!data.start_date) errors.start_date = 'Start date is required';
        if (!data.start_time) errors.start_time = 'Start time is required';
        if (!data.end_time) errors.end_time = 'End time is required';
        return errors;
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            handleSubmit(data);
        }
    };

    useEffect(() => {
        if (errors) setFormErrors(errors);
    }, [errors]);

    return (
        <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <form onSubmit={handleFormSubmit} className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">Create Event</h2>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Event Name</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Event name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={formErrors.name ? 'border-red-500' : ''}
                        />
                        {formErrors.name && <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="start_date">Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-full justify-start bg-white text-left font-normal hover:bg-white hover:text-black ${!data.start_date ? 'text-muted-foreground' : ''} ${formErrors.start_date ? 'border-red-500' : ''}`}
                                    >
                                        {data.start_date ? format(parseISO(data.start_date), 'PPP') : 'Pick a date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={data.start_date ? parseISO(data.start_date) : undefined}
                                        onSelect={(date) => setData('start_date', date ? format(date, 'yyyy-MM-dd') : '')}
                                    />
                                </PopoverContent>
                            </Popover>
                            {formErrors.start_date && <p className="mt-1 text-xs text-red-600">{formErrors.start_date}</p>}
                        </div>
                        <div>
                            <Label htmlFor="end_date">End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-full justify-start bg-white text-left font-normal hover:bg-white hover:text-black ${!data.end_date ? 'text-muted-foreground' : ''}`}
                                    >
                                        {data.end_date ? format(parseISO(data.end_date), 'PPP') : 'Pick a date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={data.end_date ? parseISO(data.end_date) : undefined}
                                        onSelect={(date) => setData('end_date', date ? format(date, 'yyyy-MM-dd') : '')}
                                        disabled={data.recurrent}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <TimePicker
                                id="start_time"
                                label="Start Time"
                                value={data.start_time}
                                onChange={(val) => setData('start_time', val)}
                                error={formErrors.start_time}
                                format="24"
                            />
                        </div>
                        <div>
                            <TimePicker
                                id="end_time"
                                label="End Time"
                                value={data.end_time}
                                onChange={(val) => setData('end_time', val)}
                                error={formErrors.end_time}
                                format="24"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="recurrent"
                            checked={data.recurrent}
                            onCheckedChange={(checked) => {
                                // unset endDate if recurrent is enabled
                                if (checked) {
                                    setData('end_date', '');
                                }
                                // unset include_weekends if recurrent is disabled
                                if (!checked) {
                                    setData('include_weekends', false);
                                }
                                setData('recurrent', !!checked);
                            }}
                        />
                        <Label htmlFor="recurrent" className="text-sm">
                            Repeat event
                        </Label>
                    </div>

                    {data.recurrent && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Label htmlFor="recurrent_type">Repeat type:</Label>
                                <select
                                    id="recurrent_type"
                                    name="recurrent_type"
                                    value={data.recurrent_type}
                                    onChange={(e) => setData('recurrent_type', e.target.value as 'daily' | 'weekly' | 'monthly')}
                                    className="rounded border border-gray-300 p-1"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="include_weekends"
                                    checked={data.include_weekends}
                                    onCheckedChange={(checked) => setData('include_weekends', !!checked)}
                                />
                                <Label htmlFor="include_weekends" className="text-sm">
                                    Include weekends
                                </Label>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" className="text-white" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" className="cursor-pointer">
                        Save Event
                    </Button>
                </div>
            </form>
        </div>
    );
}
