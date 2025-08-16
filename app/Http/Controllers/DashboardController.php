<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\WorkoutSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with CRM statistics.
     */
    public function index()
    {
        // Basic stats
        $totalClients = Client::count();
        $activeClients = Client::active()->count();
        $totalSessions = WorkoutSession::count();
        $thisMonthSessions = WorkoutSession::thisMonth()->completed()->count();

        // Monthly stats (SQLite compatible)
        $monthlyStats = WorkoutSession::selectRaw("
                CAST(strftime('%m', scheduled_at) AS INTEGER) as month,
                CAST(strftime('%Y', scheduled_at) AS INTEGER) as year,
                COUNT(*) as total_sessions,
                COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_sessions
            ")
            ->where('scheduled_at', '>=', now()->subMonths(12))
            ->groupByRaw("strftime('%Y', scheduled_at), strftime('%m', scheduled_at)")
            ->orderByRaw("strftime('%Y', scheduled_at) DESC, strftime('%m', scheduled_at) DESC")
            ->limit(12)
            ->get();

        // Upcoming sessions (next 7 days)
        $upcomingSessions = WorkoutSession::with(['client', 'clientSubscription.subscriptionType'])
            ->scheduled()
            ->whereBetween('scheduled_at', [now(), now()->addDays(7)])
            ->orderBy('scheduled_at')
            ->limit(10)
            ->get();

        // Low credit alerts
        $lowCreditAlerts = ClientSubscription::with(['client', 'subscriptionType'])
            ->active()
            ->lowCredits()
            ->orderBy('credits_remaining')
            ->limit(10)
            ->get();

        // Recent clients
        $recentClients = Client::with(['activeSubscription.subscriptionType'])
            ->latest()
            ->limit(5)
            ->get();

        // Revenue data (last 6 months, SQLite compatible)
        $revenueData = ClientSubscription::selectRaw("
                CAST(strftime('%m', created_at) AS INTEGER) as month,
                CAST(strftime('%Y', created_at) AS INTEGER) as year,
                SUM(amount_paid) as revenue
            ")
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupByRaw("strftime('%Y', created_at), strftime('%m', created_at)")
            ->orderByRaw("strftime('%Y', created_at) DESC, strftime('%m', created_at) DESC")
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalClients' => $totalClients,
                'activeClients' => $activeClients,
                'totalSessions' => $totalSessions,
                'thisMonthSessions' => $thisMonthSessions,
            ],
            'monthlyStats' => $monthlyStats,
            'upcomingSessions' => $upcomingSessions,
            'lowCreditAlerts' => $lowCreditAlerts,
            'recentClients' => $recentClients,
            'revenueData' => $revenueData,
        ]);
    }
}