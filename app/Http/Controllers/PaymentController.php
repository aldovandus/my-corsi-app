<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    //

    public function store(Request $request)
    {
        $validated = $request->validate([
            'method' => 'required|string|max:255',
            'payment_date' => 'required|string|max:255',
            'amount' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'subscription_id' => 'required|integer'
            // Aggiungi altri campi di validazione necessari
        ]);



        //$validated['subscription_id'] = 20;


        Payment::create($validated);
    }

    public function destroy($id)
    {
        //Payment::destroy($id);
        $payment = Payment::findOrFail($id);
        $payment->delete();
    }
}
