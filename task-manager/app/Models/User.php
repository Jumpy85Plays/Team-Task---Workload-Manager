<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable; // Authenticatable implements Laravel’s authentication contracts
use App\Models\Task;



class User extends Authenticatable
{
    // The columns that can be mass-assigned when creating or updating a user are clearly defined
    protected $fillable = ['name', 'role'];

    // Shows many-to-many relationship because a single user can be linked to many tasks
    // through the tasks_user pivot table
    public function tasks()
    {
        // belongsToMany is used because the relationship is not stored in either table directly
        return $this->belongsToMany(Task::class, 'tasks_user', 'user_id', 'task_id')
                    ->withTimestamps(); // Keeps pivot created_at and updated_at in sync
    }
}
