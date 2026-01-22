<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Primary key column called id that auto-increments
            $table->string('name'); // Name of the user
            $table->string('email')->unique(); // Email column, unique for authentication
            $table->string('password'); // Password column for authentication
            $table->enum('role', ['admin', 'employee']); // Role: admin or employee
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users'); // Correct table to drop
    }
};
