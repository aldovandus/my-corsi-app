<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $courses = Course::all();
        return Inertia::render('Course/Courses', [
            'courses' => $courses,
        ]);
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
            'startDate' => 'required|string|max:255',
            'endDate' => 'required|string|max:255',
            // Aggiungi altri campi di validazione necessari
        ]);

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
