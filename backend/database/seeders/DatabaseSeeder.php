<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**Seed the application's database.*/
    public function run(): void
    {
        // User::factory(10)->create();

        $admin = User::create([
            'name' => 'Admin user',
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
        
        $task1 = Task::create([
            'title' => 'Prepare monthly report',
            'description' => 'Compile and prepare the monthly sales report.',
            'status' => 'pending',
        ]);
        
        $task2 = Task::create([
            'title' => 'Update Client Database',
            'description' => 'Clean and update client contract records.',
            'status' => 'pending',
        ]);

        $task1->users()->attach([$employee1->id]);
        $task2->users()->attach([$employee1->id, $employee2->id]);
    }
}