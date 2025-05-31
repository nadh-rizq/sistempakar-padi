<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $externalUser = Socialite::driver('google')->user();

        $registeredUser = User::where("google_id", $externalUser->id)->first();
        if(!$registeredUser){
            $user = User::updateOrCreate([
                'google_id' => $externalUser->id,
            ], [
                'name' => $externalUser->name,
                'email' => $externalUser->email,
                'password' => Hash::make('expertsystem_riceplant2025'),
                'google_token' => $externalUser->token,
                'google_refresh_token' => $externalUser->refreshToken,
                'kodeRole' => 'R0LE03'
            ]);

            Auth::login($user);

            return redirect('/');

        }
        Auth::login($registeredUser);

            return redirect('/');
    }
}
