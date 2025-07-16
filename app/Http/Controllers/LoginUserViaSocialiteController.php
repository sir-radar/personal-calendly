<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginUserViaSocialiteController extends Controller
{
    public function create($provider)
    {
        // Redirect the user to the Google/Microsoft login page
        return Socialite::driver($provider)->redirect();
    }

    public function store($provider)
    {
        $response = Socialite::driver($provider)->user();

        // Check if the user exists
        $user = User::where('email', $response->getEmail())->first();

        if ($user) {
            $user->update([$provider . '_id' => $response->getId()]);
        } else {
            $user = User::create([
                $provider . '_id' => $response->getId(),
                'name'            => $response->getName(),
                'email'           => $response->getEmail(),
                'password'        => '',
                $provider . '_token' => $response->token,
            ]);
        }

        // Log the user in
        Auth::login($user);

        // Redirect the user to the dashboard
        return redirect(route('home'));
    }
}
