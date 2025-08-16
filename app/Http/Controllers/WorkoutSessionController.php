<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkoutSessionRequest;
use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\WorkoutSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sessions = WorkoutSession::with(['client', 'clientSubscription.subscriptionType'])
            ->latest('scheduled_at')
            ->paginate(15);
        
        return Inertia::render('sessions/index', [
            'sessions' => $sessions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = Client::with(['activeSubscription.subscriptionType'])
            ->active()
            ->orderBy('name')
            ->get();

        return Inertia::render('sessions/create', [
            'clients' => $clients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkoutSessionRequest $request)
    {
        $session = WorkoutSession::create($request->validated());

        return redirect()->route('sessions.show', $session)
            ->with('success', 'Workout session scheduled successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(WorkoutSession $session)
    {
        $session->load(['client', 'clientSubscription.subscriptionType']);

        return Inertia::render('sessions/show', [
            'session' => $session
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WorkoutSession $session)
    {
        $session->load(['client', 'clientSubscription']);
        
        $clients = Client::with(['activeSubscription.subscriptionType'])
            ->active()
            ->orderBy('name')
            ->get();

        return Inertia::render('sessions/edit', [
            'session' => $session,
            'clients' => $clients
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreWorkoutSessionRequest $request, WorkoutSession $session)
    {
        $session->update($request->validated());

        return redirect()->route('sessions.show', $session)
            ->with('success', 'Workout session updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkoutSession $session)
    {
        $session->delete();

        return redirect()->route('sessions.index')
            ->with('success', 'Workout session deleted successfully.');
    }


}