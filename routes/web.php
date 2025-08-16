<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Client management routes
    Route::resource('clients', ClientController::class);
    
    // Workout management routes
    Route::resource('workouts', WorkoutController::class);
    
    // Workout-client booking management routes
    Route::resource('workout-clients', WorkoutClientController::class);
    
    // Notification management routes
    Route::get('notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('notifications', [NotificationController::class, 'store'])->name('notifications.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
