<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkoutClientRequest;
use App\Models\Client;
use App\Models\Workout;
use App\Models\WorkoutClient;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WorkoutClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = WorkoutClient::with(['client', 'workout'])
            ->latest()
            ->paginate(15);
        
        return Inertia::render('workout-clients/index', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = Client::where('status', 'active')
            ->where('credits_remaining', '>', 0)
            ->get(['id', 'name', 'email', 'credits_remaining']);
            
        $workouts = Workout::where('status', 'active')
            ->where('scheduled_at', '>', now())
            ->get(['id', 'name', 'scheduled_at', 'capacity']);
        
        return Inertia::render('workout-clients/create', [
            'clients' => $clients,
            'workouts' => $workouts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkoutClientRequest $request)
    {
        $validated = $request->validated();
        $validated['booking_date'] = now();
        
        $booking = WorkoutClient::create($validated);

        return redirect()->route('workout-clients.show', $booking)
            ->with('success', 'Booking created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(WorkoutClient $workoutClient)
    {
        $workoutClient->load(['client', 'workout']);
        
        return Inertia::render('workout-clients/show', [
            'booking' => $workoutClient
        ]);
    }

    /**
     * Mark attendance for a workout booking.
     */
    public function update(Request $request, WorkoutClient $workoutClient)
    {
        $request->validate([
            'attended' => 'required|boolean'
        ]);

        if ($request->attended && !$workoutClient->attended) {
            $workoutClient->markAttendance();
        } else {
            $workoutClient->update(['attended' => $request->attended]);
        }

        return redirect()->route('workout-clients.show', $workoutClient)
            ->with('success', 'Attendance updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkoutClient $workoutClient)
    {
        // If credits were deducted and client didn't attend, refund the credit
        if ($workoutClient->credits_deducted && !$workoutClient->attended) {
            $workoutClient->client->increment('credits_remaining');
        }
        
        $workoutClient->delete();

        return redirect()->route('workout-clients.index')
            ->with('success', 'Booking cancelled successfully.');
    }
}