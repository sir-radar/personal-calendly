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
        dd($request->validated());
    }
}
