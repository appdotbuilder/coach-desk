<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Show the notifications dashboard.
     */
    public function index(NotificationService $notificationService)
    {
        $stats = $notificationService->getLowCreditsStats();
        
        return Inertia::render('notifications/index', [
            'stats' => $stats,
        ]);
    }

    /**
     * Send low credits notifications manually.
     */
    public function store(Request $request, NotificationService $notificationService)
    {
        try {
            $sentCount = $notificationService->sendLowCreditsNotifications();
            
            return redirect()->route('notifications.index')
                ->with('success', "Successfully sent {$sentCount} low credits notification(s).");
                
        } catch (\Exception $e) {
            return redirect()->route('notifications.index')
                ->with('error', 'Failed to send notifications: ' . $e->getMessage());
        }
    }
}