<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);
Route::get('/users/{id}/tasks', [UserController::class, 'tasks']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/my-tasks/{userId}', [TaskController::class, 'myTasks']);
Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']);
