<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\LoginUserViaSocialiteController;
use App\Http\Middleware\InjectUserId;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['middleware' => ['auth']], function () {
    Route::get('/', [EventController::class, 'index'])->name('home');
    Route::post('/events', [EventController::class, 'store'])->middleware(InjectUserId::class);
});

Route::group(['middleware' => ['guest']], function () {
    Route::get('/login', function () {
        return Inertia::render('login');
    })->name('login');

    Route::get('auth/{provider}/redirect', [LoginUserViaSocialiteController::class, 'create'])->where('provider', 'google');
    Route::get('auth/{provider}/callback', [LoginUserViaSocialiteController::class, 'store'])->where('provider', 'google');
});



// Route::get('/ai', function () {
//     return Inertia::render('ai');
// });
