<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/* Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard'); */

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/customers', [CustomerController::class, 'index'])->name('customer.index');
    Route::get('/customers/edit/{id}', [CustomerController::class, 'edit'])->name('customer.edit');
    Route::get('/customers/show/{customer}', [CustomerController::class, 'show'])->name('customer.show');
    Route::patch('/customers/update', [CustomerController::class, 'update'])->name('customer.update');
    Route::get('/customers/add', [CustomerController::class, 'add'])->name('customer.add');
    Route::post('/customers/store', [CustomerController::class, 'store'])->name('customer.store');
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customer.destroy');
    Route::get('/courses', [CourseController::class, 'index'])->name('course.index');
    Route::get('/courses/add', [CourseController::class, 'add'])->name('course.add');
    Route::post('/courses/store', [CourseController::class, 'store'])->name('course.store');
    Route::post('/subscription/store', [SubscriptionController::class, 'store'])->name('subscription.store');
    Route::get('/subscription/{id}', [SubscriptionController::class, 'show'])->name('subscription.show');
    Route::delete('/subscription/{id}', [SubscriptionController::class, 'destroy'])->name('subscription.destroy');
    Route::get('/courses/show/{course}', [CourseController::class, 'show'])->name('course.show');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('course.destroy');
});

require __DIR__ . '/auth.php';
