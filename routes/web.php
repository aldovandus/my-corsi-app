<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
 */
/* Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard'); */

Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/customers', [CustomerController::class, 'index'])->name('customer.index');
    Route::get('/customer/edit/{id}', [CustomerController::class, 'edit'])->name('customer.edit');
    Route::get('/customer/{customer}', [CustomerController::class, 'show'])->name('customer.show');
    Route::patch('/customers/update', [CustomerController::class, 'update'])->name('customer.update');
    Route::get('/customers/add', [CustomerController::class, 'add'])->name('customer.add');
    Route::post('/customers/store', [CustomerController::class, 'store'])->name('customer.store');
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customer.destroy');
    Route::get('/courses', [CourseController::class, 'index'])->name('course.index');
    Route::get('/courses/add', [CourseController::class, 'add'])->name('course.add');
    Route::post('/courses/store', [CourseController::class, 'store'])->name('course.store');
    Route::get('/courses/show/{course}', [CourseController::class, 'show'])->name('course.show');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('course.destroy');
    Route::post('/subscription/store', [SubscriptionController::class, 'store'])->name('subscription.store');
    Route::get('/subscription/{id}', [SubscriptionController::class, 'show'])->name('subscription.show');
    Route::delete('/subscription/{id}', [SubscriptionController::class, 'destroy'])->name('subscription.destroy');
    Route::post('/payment/store', [PaymentController::class, 'store'])->name('payment.store');
    Route::delete('/payment/{id}', [PaymentController::class, 'destroy'])->name('payment.destroy');
});

require __DIR__ . '/auth.php';
