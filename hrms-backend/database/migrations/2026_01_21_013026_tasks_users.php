<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks_user', function (Blueprint $table) {
// Creates a new table in the database called tasks_user if it doesnt already exist. If it does exist it will not try to create it again and will be skipped. 
            $table->id();                       // Adds a primary key column called id that auto-increments
            $table->unsignedBigInteger('task_ID'); // Adds an integer column task_ID to store the reference to a task
            $table->timestamps();               //Adds a timestamp column created_at, updated_at automatically to track when records are created or updated

            $table->foreign('task_ID')          // Makes task_ID a foreign key referencing the id column in the tasks table. Enforcing integrity between this and the task tables.
                                                        //If a task is deleted, all records associated with the task in this table will also be deleted (cascadeOnDelete)
                  ->references('id')
                  ->on('tasks')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks_user'); //Deletes the table when rolling back migrations ensuring that migrations can be reversed safely. 
        
    }
};
