<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

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

        $validated = $request->validate([
            'course_id' => [
                'required',
                Rule::unique('subscription')->where(function ($query) use ($request) {
                    return $query->where('customer_id', $request->customer_id);
                }),
            ],
            'price' => 'required|string|max:10',
            'subscription_date' => 'required|string|max:25',

            // Aggiungi altri campi di validazione necessari
        ], ['course_id.unique' => 'Iscrizione già effettuata per questo corso.', 'course_id.required' => 'Seleziona un corso!']);




        // Impostare l'ID del cliente nei dati validati
        $validated['customer_id'] = $request->customer_id;

        Subscription::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //

        return Inertia::render('Subscription/index', [
            'subscriptionId' => $id
        ]);
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
    public function destroy($id)
    {
        //
        $subscription = Subscription::findOrFail($id);
        $subscription->delete();

        /* return redirect()->route('subscription.index')->with('message', [
            'type' => 'success',
            'content' => 'Subscription eliminato con successo.'
        ]); */
    }
}
