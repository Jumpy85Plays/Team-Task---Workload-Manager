<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Creates a task using only columns defined in the tasks table
    // Then syncs the task with an array of user IDs via the pivot table
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|in:pending,in progress,completed',
            'user_ids' => 'required|array'
        ]);

        // Inserts into tasks table (id, title, description, status, timestamps)
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        // Populates tasks_user pivot table
        $task->users()->sync($request->user_ids);

        return response()->json($task, 201);
    }

    // Fetches all tasks assigned to a specific user
    public function myTasks($userId)
    {
        // Filters tasks by pivot relationship
        return Task::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();
    }

    // Updates only the status column of a task
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,in progress,completed'
        ]);

        // Finds task by primary key or returns 404
        $task = Task::findOrFail($id);

        // Updates status column only
        $task->update([
            'status' => $request->status
        ]);

        return response()->json($task);
    }
}
