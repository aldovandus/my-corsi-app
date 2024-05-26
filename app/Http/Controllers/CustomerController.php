<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class CustomerController extends Controller
{
    //
    public function index()
    {
        $customers = Customer::all();
        return Inertia::render('Customer/Customers', [
            'customers' => $customers,
        ]);
    }


    public function edit(string $id)
    {
        $customer = Customer::find($id);

        // Controlla se il cliente esiste
        if (!$customer) {
            // Gestisci il caso in cui il cliente non esiste, ad esempio reindirizza l'utente con un messaggio di errore
            return redirect()->route('customer.index')->with('error', 'Cliente non trovato');
        }

        $subscriptionsWithCourses = Subscription::join('course', 'subscription.course_id', '=', 'course.id')
            ->select('subscription.price', 'course.code', 'course.title', 'course.price') // seleziona i campi desiderati
            ->where('customer_id', $id)->get();


        return Inertia::render('Customer/Edit', [
            'customer' => $customer,
            'subscriptions' =>  $subscriptionsWithCourses
        ]);
    }

    public function add()
    {
        return Inertia::render('Customer/AddCustomer');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers',
            'phone' => 'required|string|max:10',
            'cf' => 'required|string|max:11',
            'birth_date' => 'required|string|max:100',
            'birth_place' => 'required|string|max:100',
            'cap' => 'required|string|max:10',
            'address' => 'required|string|max:50',
            'extra' => 'string|max:250',

            // Aggiungi altri campi di validazione necessari
        ], [
            'email.required' => 'Inserisci un indirizzo email',
            'email.email' => "L'indirizzo email non ha un formato valido.",
            'email.unique' => "L'indirizzo email esiste già.",
        ]);

        // Convert to uppercase
        $validated['cf'] = strtoupper($validated['cf']);
        //$validated['subscription_date'] = strtoupper($validated['subscription_date']);

        Customer::create($validated);

        return redirect()->route('customer.index')->with('success', 'Customer created successfully.');
    }

    public function update(Request $request)
    {

        /*   if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        } */
        $customer = Customer::findOrFail($request->id);
        $customer->update($request->only('firstname', 'lastname'));

        return redirect()->route('customer.edit', $request->id)->with('success', 'Customer updated successfully.');
    }

    public function show(Customer $customer)
    {

        $subscriptionsWithCourses = Subscription::join('course', 'subscription.course_id', '=', 'course.id')
            ->select('subscription.id', 'subscription.price', 'course.code', 'course.title', 'course.price') // seleziona i campi desiderati
            ->where('customer_id', $customer->id)->get();

        return Inertia::render('Customer/ShowCustomer/index', [
            'customer' => $customer,
            'subscriptions' => $subscriptionsWithCourses
        ]);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->route('customer.index')->with('message', [
            'type' => 'success',
            'content' => 'Cliente eliminato con successo.'
        ]);
    }
}
