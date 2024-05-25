<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $subscriptionCount = Subscription::count();


        $latestSubscriptions = Subscription::join('customers', 'subscription.customer_id', '=', 'customers.id')->join('course', 'subscription.course_id', '=', 'course.id')
            ->select('subscription.course_id', 'subscription.price', 'customers.id', 'customers.firstname', 'customers.lastname', 'customers.email', 'subscription.subscription_date', 'course.code', 'course.title') // seleziona i campi desiderati
            ->orderBy('subscription.created_at', 'desc')->take(5)->get();

        return Inertia::render('Dashboard', ['subscriptionsCount' => $subscriptionCount, 'latestSubscriptions' => $latestSubscriptions]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
