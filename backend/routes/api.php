<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

// User login routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);

// Task routes
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/my-tasks/{userId}', [TaskController::class, 'myTasks']);
Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']);

// Users route with role filtering
Route::get('/users', [UserController::class, 'index']); // supports ?role=employee
