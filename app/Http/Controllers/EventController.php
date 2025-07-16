<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('user:id,name')->where('user_id', Auth::id())->get();

        return Inertia::render('home', [
            'events' => $events,
        ]);
    }

    public function store(EventRequest $request)
    {
        try {
            Event::create($request->validated());
        } catch (\Throwable $e) {
            return back()->withErrors('error', 'Something went wrong');
        }

        return back()->with('success', 'Event created successfully');
    }
}
