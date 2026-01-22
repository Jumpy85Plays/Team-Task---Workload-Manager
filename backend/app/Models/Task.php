<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    // Allows mass assignment for task-related fields specified
    protected $fillable = ['title', 'description', 'status'];

    // Defines the inverse many-to-many relationship with users
    public function users()
    {
        // belongsToMany is required because tasks are assigned via a pivot table
        return $this->belongsToMany(User::class, 'tasks_user', 'task_id', 'user_id')
                    ->withTimestamps(); // Tracks assignment timestamps
    }
}
