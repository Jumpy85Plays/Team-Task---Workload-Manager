<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

//user login routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);

// Task routes
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/my-tasks/{userId}', [TaskController::class, 'myTasks']);
Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']);
