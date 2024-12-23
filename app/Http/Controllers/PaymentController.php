<?php

namespace App\Http\Controllers;

use App\Models\Payment;

use App\Models\Subscription;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;

class PaymentController extends Controller
{
    //

    public function store(Request $request)
    {
        $validated = $request->validate([
            'payment_number' => 'required|numeric',
            'method' => 'required|string|max:255',
            'invoice_number' => 'required|string',
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'subscription_id' => 'required|integer'
            // Aggiungi altri campi di validazione necessari
        ], ['method.required' => "Inserisci il metodo di pagamento.", 'amount.required' => "Inserisci l'importo.", "payment_date" => "Inserisci la data del pagamento.", "invoice_number.required" => "Inserisci il numero di ricevuta."]);

        // Recupera la Subscription associata
        $subscription = Subscription::findOrFail($validated['subscription_id']);

        // Calcola il totale degli amount dei Payment esistenti per questa Subscription
        $totalAmount = Payment::where('subscription_id', $validated['subscription_id'])->sum('amount');

        // Aggiungi l'amount del nuovo Payment al totale
        $newTotalAmount = $totalAmount + $validated['amount'];


        // Verifica se il nuovo totale supera il price della Subscription
        if ($newTotalAmount > $subscription->price) {
            // Lancia un'eccezione se il totale supera il price
            throw ValidationException::withMessages([
                'overamount' => 'Il totale deve essere inferiore al prezzo di iscrizione!'
            ]);
        }

        $payment_date = Carbon::parse($request->input('payment_date'))->format('Y-m-d H:i:s');
        $validated['payment_date'] = $payment_date;


        Payment::create($validated);
    }

    public function destroy($id)
    {
        //Payment::destroy($id);
        $payment = Payment::findOrFail($id);
        $payment->delete();
    }
}
