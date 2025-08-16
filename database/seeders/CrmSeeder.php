<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\SubscriptionType;
use App\Models\WorkoutSession;
use Illuminate\Database\Seeder;

class CrmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create subscription types
        $subscriptionTypes = [
            [
                'name' => 'Basic Plan',
                'description' => 'Perfect for beginners starting their fitness journey',
                'credits_included' => 4,
                'price' => 120.00,
                'validity_days' => 30,
                'status' => 'active'
            ],
            [
                'name' => 'Premium Plan',
                'description' => 'Ideal for regular fitness enthusiasts',
                'credits_included' => 8,
                'price' => 200.00,
                'validity_days' => 30,
                'status' => 'active'
            ],
            [
                'name' => 'Elite Plan',
                'description' => 'Maximum support for serious fitness goals',
                'credits_included' => 12,
                'price' => 300.00,
                'validity_days' => 30,
                'status' => 'active'
            ],
            [
                'name' => 'Drop-in Session',
                'description' => 'Try us out with a single session',
                'credits_included' => 1,
                'price' => 35.00,
                'validity_days' => 7,
                'status' => 'active'
            ]
        ];

        foreach ($subscriptionTypes as $type) {
            SubscriptionType::create($type);
        }

        // Create clients with subscriptions and sessions
        Client::factory(20)->create()->each(function ($client) {
            // Each client has 1-2 subscriptions
            $subscriptionCount = random_int(1, 2);
            
            for ($i = 0; $i < $subscriptionCount; $i++) {
                $subscription = ClientSubscription::factory()
                    ->active()
                    ->create(['client_id' => $client->id]);

                // Create workout sessions for each subscription
                $sessionCount = random_int(3, 8);
                WorkoutSession::factory($sessionCount)
                    ->create([
                        'client_id' => $client->id,
                        'client_subscription_id' => $subscription->id,
                    ]);
            }
        });

        // Create some clients with low credits for notifications
        Client::factory(3)->create()->each(function ($client) {
            $subscription = ClientSubscription::factory()
                ->lowCredits()
                ->create(['client_id' => $client->id]);

            WorkoutSession::factory(5)
                ->completed()
                ->create([
                    'client_id' => $client->id,
                    'client_subscription_id' => $subscription->id,
                ]);
        });

        // Create some upcoming sessions
        $activeClients = Client::whereHas('subscriptions', function ($query) {
            $query->where('status', 'active')
                ->where('end_date', '>=', now());
        })->limit(10)->get();

        foreach ($activeClients as $client) {
            /** @var \App\Models\ClientSubscription|null $activeSubscription */
            $activeSubscription = $client->subscriptions()
                ->where('status', 'active')
                ->where('end_date', '>=', now())
                ->first();
            if ($activeSubscription && $activeSubscription->credits_remaining > 0) {
                WorkoutSession::factory(random_int(1, 3))
                    ->upcoming()
                    ->create([
                        'client_id' => $client->id,
                        'client_subscription_id' => $activeSubscription->id,
                    ]);
            }
        }
    }
}