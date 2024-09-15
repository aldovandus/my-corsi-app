<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use App\Models\Customer;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class CustomerController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = Customer::query();

        if ($request->has('q')) {
            $searchTerm = $request->query('q');

            // Dividi il termine di ricerca in parole
            $terms = explode(' ', $searchTerm);

            if (count($terms) >= 2) {
                // Considera il primo termine come possibile nome e il resto come possibile cognome
                $firstname = $terms[0];
                $lastname = implode(' ', array_slice($terms, 1));

                // Considera anche l'inverso: primo come cognome, e il resto come nome
                $reverseFirstname = $terms[count($terms) - 1];
                $reverseLastname = implode(' ', array_slice($terms, 0, -1));

                $query->where(function ($q) use ($firstname, $lastname, $reverseFirstname, $reverseLastname) {
                    // Cerca sia nome-cognome che cognome-nome
                    $q->where(function ($subQuery) use ($firstname, $lastname) {
                        $subQuery->where('firstname', 'like', '%' . $firstname . '%')
                            ->where('lastname', 'like', '%' . $lastname . '%');
                    })
                        ->orWhere(function ($subQuery) use ($reverseFirstname, $reverseLastname) {
                            $subQuery->where('firstname', 'like', '%' . $reverseFirstname . '%')
                                ->where('lastname', 'like', '%' . $reverseLastname . '%');
                        });
                });
            } else {
                // Se è presente solo un termine, cerca per nome o cognome
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('firstname', 'like', '%' . $searchTerm . '%')
                        ->orWhere('lastname', 'like', '%' . $searchTerm . '%');
                });
            }
        }

        $query->orderBy('id', 'desc');
        $customers = $query->get();

        return Inertia::render('Customer/Customers', [
            'customers' => $customers,
            'filter' => $request->query('q')
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


        return Inertia::render('Customer/AddCustomer', [
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
            'cf' => 'required|string|max:16',
            'birth_date' => 'required|string|max:100',
            'birth_place' => 'required|string|max:100',
            'cap' => 'required|string|max:10',
            'address' => 'required|string|max:50',
            'extra' => 'string|max:250',

            // Aggiungi altri campi di validazione necessari
        ], [
            'firstname.required' => 'Inserisci il nome',
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

        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('customers')->ignore($request->id),
            ],
            'phone' => 'required|string|max:10',
            'cf' => 'required|string|max:16',
            'birth_date' => 'required|string|max:100',
            'birth_place' => 'required|string|max:100',
            'cap' => 'required|string|max:10',
            'address' => 'required|string|max:50',
            'extra' => 'string|max:250',

            // Aggiungi altri campi di validazione necessari
        ], [
            'firstname.required' => 'Inserisci il nome',
            'email.required' => 'Inserisci un indirizzo email',
            'email.email' => "L'indirizzo email non ha un formato valido.",
            'email.unique' => "L'indirizzo email esiste già.",
        ]);

        $customer = Customer::findOrFail($request->id);
        //$customer->update($request->only('firstname', 'lastname', 'extra', 'birth_date'));
        $customer->update($request->all());

        return redirect()->route('customer.index', $request->id)->with('success', 'Cliente creato correttamente.');
    }

    public function show(Customer $customer)
    {

        $subscriptionsWithCourses = Subscription::join('course', 'subscription.course_id', '=', 'course.id')
            ->leftjoin('payments', 'payments.subscription_id', 'subscription.id')
            ->select('subscription.id', 'subscription.price', 'subscription.subscription_date', 'course.code', 'course.title', DB::raw('sum(payments.amount) as total')) // seleziona i campi desiderati
            ->where('customer_id', $customer->id)->groupBy('subscription.id')->get();

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
