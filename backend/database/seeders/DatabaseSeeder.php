<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create users
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $employee1 = User::create([
            'name' => 'Employee One',
            'email' => 'employee1@example.com',
            'password' => Hash::make('password'),
            'role' => 'employee',
        ]);

        $employee2 = User::create([
            'name' => 'Employee Two',
            'email' => 'employee2@example.com',
            'password' => Hash::make('password'),
            'role' => 'employee',
        ]);

        // Create basic tasks
        $tasks = [
            Task::create([
                'title' => 'Office Cleaning',
                'description' => 'Clean assigned work area and common spaces.',
                'status' => 'pending',
            ]),
            Task::create([
                'title' => 'Equipment Check',
                'description' => 'Inspect and report issues with office equipment.',
                'status' => 'pending',
            ]),
            Task::create([
                'title' => 'Daily Report',
                'description' => 'Submit daily activity summary.',
                'status' => 'pending',
            ]),
        ];

        // Assign all basic tasks to every employee
        foreach ($tasks as $task) {
            $task->users()->attach([$employee1->id, $employee2->id]);
        }
    }
}
