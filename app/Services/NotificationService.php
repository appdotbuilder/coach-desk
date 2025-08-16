<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Send low credits notifications to clients.
     *
     * @return int Number of notifications sent
     */
    public function sendLowCreditsNotifications(): int
    {
        $lowCreditClients = Client::where('status', 'active')
            ->where('credits_remaining', '<', 2)
            ->get();

        $sentCount = 0;

        foreach ($lowCreditClients as $client) {
            try {
                $this->sendLowCreditsEmail($client);
                $sentCount++;
                
                Log::info('Low credits notification sent', [
                    'client_id' => $client->id,
                    'client_email' => $client->email,
                    'credits_remaining' => $client->credits_remaining,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to send low credits notification', [
                    'client_id' => $client->id,
                    'client_email' => $client->email,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return $sentCount;
    }

    /**
     * Send low credits email to a specific client.
     *
     * @param Client $client
     * @return void
     */
    protected function sendLowCreditsEmail(Client $client): void
    {
        Mail::send('emails.low-credits', [
            'client' => $client,
            'creditsRemaining' => $client->credits_remaining,
            'subscriptionType' => $client->subscription_type_name,
        ], function ($message) use ($client) {
            $message->to($client->email, $client->name)
                ->subject('Low Credits - Time to Top Up!');
        });
    }

    /**
     * Get statistics for low credits clients.
     *
     * @return array
     */
    public function getLowCreditsStats(): array
    {
        $lowCreditClients = Client::where('status', 'active')
            ->where('credits_remaining', '<', 2)
            ->get();

        return [
            'total_low_credit_clients' => $lowCreditClients->count(),
            'clients_with_zero_credits' => $lowCreditClients->where('credits_remaining', 0)->count(),
            'clients_with_one_credit' => $lowCreditClients->where('credits_remaining', 1)->count(),
            'breakdown_by_subscription' => $lowCreditClients
                ->groupBy('subscription_type')
                ->map(fn ($clients, $type) => [
                    'type' => $type . ' Sessions',
                    'count' => $clients->count(),
                ])
                ->values()
                ->toArray(),
        ];
    }
}