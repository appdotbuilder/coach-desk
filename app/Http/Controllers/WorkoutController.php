<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkoutRequest;
use App\Http\Requests\UpdateWorkoutRequest;
use App\Models\Workout;
use Inertia\Inertia;

class WorkoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workouts = Workout::with(['clients'])
            ->latest('scheduled_at')
            ->paginate(10);
        
        return Inertia::render('workouts/index', [
            'workouts' => $workouts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('workouts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkoutRequest $request)
    {
        $workout = Workout::create($request->validated());

        return redirect()->route('workouts.show', $workout)
            ->with('success', 'Workout created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Workout $workout)
    {
        $workout->load(['clients', 'workoutClients.client']);
        
        return Inertia::render('workouts/show', [
            'workout' => $workout
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workout $workout)
    {
        return Inertia::render('workouts/edit', [
            'workout' => $workout
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkoutRequest $request, Workout $workout)
    {
        $workout->update($request->validated());

        return redirect()->route('workouts.show', $workout)
            ->with('success', 'Workout updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workout $workout)
    {
        $workout->delete();

        return redirect()->route('workouts.index')
            ->with('success', 'Workout deleted successfully.');
    }
}