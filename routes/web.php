<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CourseController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/customers', [CustomerController::class, 'index'])->name('customer.index');
    Route::get('/customers/edit/{id}', [CustomerController::class, 'edit'])->name('customer.edit');
    Route::patch('/customers/update', [CustomerController::class, 'update'])->name('customer.update');
    Route::get('/customers/add', [CustomerController::class, 'add'])->name('customer.add');
    Route::post('/customers/store', [CustomerController::class, 'store'])->name('customer.store');
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customer.destroy');
    Route::get('/courses', [CourseController::class, 'index'])->name('course.index');
    Route::get('/courses/add', [CourseController::class, 'add'])->name('course.add');
    Route::post('/courses/store', [CourseController::class, 'store'])->name('course.store');
    Route::get('/courses/show/{course}', [CourseController::class, 'show'])->name('course.show');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('course.destroy');
});

require __DIR__ . '/auth.php';
