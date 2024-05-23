<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\Customer;
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
    public function store(Request $request, Customer $customer)
    {
        //

        $validated = $request->validate([
            'course_id' => 'required',
            'customer_id' => 'required',
            'price' => 'string|max:100',
            'subscription_date' => 'required|string|max:25',

            // Aggiungi altri campi di validazione necessari
        ]);

        //        $validated['customer_id'] = $customer->id;
        Subscription::create($validated);
       /*  return redirect()->route("customer.show", $customer)->with('message', [
            'type' => 'success',
            'content' => 'Iscrizione effettuata con successo.'
        ]);  */

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
