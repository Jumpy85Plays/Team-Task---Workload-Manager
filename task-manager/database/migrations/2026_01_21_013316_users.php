<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use function Laravel\Prompts\table;
use function PHPUnit\Framework\callback;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // Primary key column called id that auto-increments
            $table->string('name'); // String column for the task name
            $table->enum('role', ['admin','employee']); // Enum column for task role, either admin or employee
            $table->timestamps(); // Timestamp columns for when the users account was created_at and updated_at


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');  // Drops the users table if it exists when rolling back migrations
    }
};
