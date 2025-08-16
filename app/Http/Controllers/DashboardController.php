<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Workout;
use App\Models\WorkoutClient;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with statistics.
     */
    public function index()
    {
        $currentMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Monthly statistics
        $monthlyStats = [
            'total_checkins' => WorkoutClient::where('attended', true)
                ->whereBetween('created_at', [$currentMonth, $endOfMonth])
                ->count(),
            
            'unique_clients' => WorkoutClient::where('attended', true)
                ->whereBetween('created_at', [$currentMonth, $endOfMonth])
                ->distinct('client_id')
                ->count(),
            
            'checkins_by_subscription' => WorkoutClient::join('clients', 'workout_clients.client_id', '=', 'clients.id')
                ->where('workout_clients.attended', true)
                ->whereBetween('workout_clients.created_at', [$currentMonth, $endOfMonth])
                ->selectRaw('clients.subscription_type, COUNT(*) as total_count')
                ->groupBy('clients.subscription_type')
                ->pluck('total_count', 'subscription_type')
                ->mapWithKeys(fn($count, $type) => [$type . ' Sessions' => (int) $count])
                ->toArray(),
        ];

        // Quick stats
        $quickStats = [
            'total_clients' => Client::where('status', 'active')->count(),
            'low_credit_clients' => Client::where('status', 'active')
                ->where('credits_remaining', '<', 2)
                ->count(),
            'upcoming_workouts' => Workout::where('status', 'active')
                ->where('scheduled_at', '>', now())
                ->where('scheduled_at', '<', now()->addDays(7))
                ->count(),
            'todays_workouts' => Workout::where('status', 'active')
                ->whereDate('scheduled_at', today())
                ->count(),
        ];

        // Recent activity
        $recentBookings = WorkoutClient::with(['client', 'workout'])
            ->latest()
            ->limit(5)
            ->get();

        $lowCreditClients = Client::where('status', 'active')
            ->where('credits_remaining', '<', 2)
            ->limit(5)
            ->get(['id', 'name', 'email', 'credits_remaining']);

        return Inertia::render('dashboard', [
            'monthlyStats' => $monthlyStats,
            'quickStats' => $quickStats,
            'recentBookings' => $recentBookings,
            'lowCreditClients' => $lowCreditClients,
        ]);
    }
}