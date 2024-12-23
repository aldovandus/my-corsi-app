<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;


class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Course::query();

        if ($request->has('q')) {
            $query->where('code', 'like', '%' . $request->query('q') . '%')->orWhere('title', 'like', '%' . $request->query('q') . '%');
        }

        $query->orderBy('id', 'desc');


        $courses = $query->get();
        return Inertia::render('Course/Courses', [
            'courses' => $courses,
            'filter' => $request->query('q')
        ]);
    }

    public function getAll()
    {
        $courses = Course::all();
        return response()->json($courses);
    }

    public function add()
    {
        return Inertia::render('Course/AddCourse');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'code' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'price' => 'required|string|max:255',
            'startDate' => 'required|date',
            'endDate' => 'nullable|date',
            'startStage' => 'nullable|date',
            'endDate10' => 'nullable|date',
            //'examDate' => 'nullable|date',
            'stageLocation' => 'nullable|string|max:255',
            'startTime' => 'nullable|date_format:H:i',
            'endTime' => 'nullable|date_format:H:i',
            'classroom' => 'nullable|string|max:255',
            'extra' => 'nullable|string|max:1000',
            // Aggiungi altri campi di validazione necessari
        ]);

        $start_date = Carbon::parse($request->input('startDate'))->format('Y-m-d H:i:s');
        $end_date = Carbon::parse($request->input('endDate'))->format('Y-m-d H:i:s');
        $start_stage = Carbon::parse($request->input('endDate'))->format('Y-m-d H:i:s');
        $end_date10 = Carbon::parse($request->input('endDate10'))->format('Y-m-d H:i:s');

        $validated["startDate"] = $start_date;
        $validated["endDate"] = $end_date;
        $validated["endDate10"] = $end_date10;
        $validated["startStage"] = $start_stage;

        Course::create($validated);


        return redirect()->route('course.index')->with('message', [
            'type' => 'success',
            'content' => 'Corso creato con successo.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
        $subscriptions = Subscription::join('customers', 'subscription.customer_id', '=', 'customers.id')
            ->select('subscription.id', 'subscription.price', 'customers.id as customer_id', 'customers.firstname', 'customers.lastname', 'customers.email') // seleziona i campi desiderati
            ->where('course_id', $course->id)->paginate(12);


        return Inertia::render('Course/ShowCourse/index', [
            'course' => $course,
            'subscriptions' =>  $subscriptions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return redirect()->route('course.index')->with('message', [
            'type' => 'danger',
            'content' => 'Corso eliminato con successo.'
        ]);
    }
}
