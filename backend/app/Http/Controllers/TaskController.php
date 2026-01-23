<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Create a task and assign users
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|in:pending,in progress,completed',
            'user_ids' => 'required|array'
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        $task->users()->sync($request->user_ids);

        return response()->json($task, 201);
    }

    // Get all tasks for a specific user
    public function myTasks($userId)
    {
        $tasks = Task::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        return response()->json($tasks); // Ensures Axios gets JSON
    }

    // Update status of a task
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,in progress,completed'
        ]);

        $task = Task::findOrFail($id);

        $task->update([
            'status' => $request->status
        ]);

        return response()->json($task);
    }
}
