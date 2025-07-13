<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();

        return Inertia::render('home', [
            'events' => $events,
        ]);
    }

    public function store(EventRequest $request)
    {
        try {
            $event = Event::create($request->validated());
        } catch (\Throwable $e) {
            return back()->with('error', $e->getMessage());
        }

        return back()->with('success', 'Event created successfully');
    }
}
