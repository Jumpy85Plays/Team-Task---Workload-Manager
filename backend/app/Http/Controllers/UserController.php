<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Log in user
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json(Auth::user()); // Must return id + role
    }

    // Log out user
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }
}
//     // Get tasks for a specific user
//     public function tasks($id)
//     {
//         $user = User::findOrFail($id);
//         $tasks = $user->tasks; // Assuming User model has tasks relationship

//         return response()->json($tasks); // Ensures Axios gets JSON
//     }
// }