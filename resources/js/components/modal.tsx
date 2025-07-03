export default function modal() {
    return (
        <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">Create Event on {selectedDate?.format('dddd, MMMM D, YYYY')}</h2>

                <div className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Event name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full rounded border p-2"
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleFormChange} className="rounded border p-2" />
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleFormChange} className="rounded border p-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <input type="time" name="startTime" value={formData.startTime} onChange={handleFormChange} className="rounded border p-2" />
                        <input type="time" name="endTime" value={formData.endTime} onChange={handleFormChange} className="rounded border p-2" />
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" name="repeat" checked={formData.repeat} onChange={handleFormChange} />
                        Repeat event
                    </label>
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <button onClick={() => setEventModalOpen(false)} className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
                        Cancel
                    </button>
                    <button onClick={handleEventSubmit} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Save Event
                    </button>
                </div>
            </div>
        </div>
    );
}
