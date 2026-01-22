<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Log in a user using email and password
    // Uses Laravel's built-in authentication system
    public function login(Request $request)
    {
        // Extract email and password from request
        $credentials = $request->only('email', 'password');

        // Attempt authentication; return 401 if invalid
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Return the authenticated user on success
        return response()->json(Auth::user());
    }

    // Logs out the currently authenticated user and clears the session
    public function logout()
    {
        Auth::logout(); // Logs out the user
        return response()->json(['message' => 'Logged out']);
    }

    // Get all tasks assigned to a specific user
    // Loads tasks via the many-to-many relationship
    public function tasks($userId)
    {
        // Find user and eager load related tasks
        $user = User::with('tasks')->findOrFail($userId); // $userId is the primary key value

        // Return tasks directly as JSON
        return response()->json($user->tasks);
    }
}
