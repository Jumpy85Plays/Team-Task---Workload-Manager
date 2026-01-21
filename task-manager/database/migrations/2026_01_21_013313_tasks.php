<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\Console\Helper\Table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // Primary key column called id that auto-increments
            $table->string('title'); // String column for the task title
            $table->text('description')->nullable(); // Text column for task description, can be null
            $table->date('due_date')->nullable(); // Date column for due date, can be null
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending'); // Enum column for task status with default value
            $table->timestamps(); // Timestamp columns created_at and updated_at


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks'); // Drops the tasks table if it exists when rolling back migrations
    }
};
