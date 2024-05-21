<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $validated = $request->validate([
            'course_id' => 'required',
            'customer_id' => 'required',
            'price' => 'string|max:100',
            'subscription_date' => 'required|string|max:25',
            // Aggiungi altri campi di validazione necessari
        ]);

        $subscription = Subscription::create($validated);
        return redirect()->route("")->with('message', [
            'type' => 'success',
            'content' => 'Iscrizione effettuata con successo.'
        ]);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscription $subscription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subscription $subscription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscription $subscription)
    {
        //
    }
}
