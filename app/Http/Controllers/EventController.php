<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    function index()
    {
        $events = Event::all();
        return Inertia::render('home', [
            'events' => $events
        ]);
    }

    function store(EventRequest $request)
    {
        try {
            $event = Event::create($request->validated());
        } catch (\Exception $e) {
            return redirect()->back()->with('errors', $e->getMessage());
        }

        return redirect()->back()->with('event', $event);
    }
}