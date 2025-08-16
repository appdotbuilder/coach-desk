<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\SubscriptionType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClientSubscription>
 */
class ClientSubscriptionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ClientSubscription>
     */
    protected $model = ClientSubscription::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subscriptionType = SubscriptionType::inRandomOrder()->first() 
            ?? SubscriptionType::factory()->create();

        $startDate = $this->faker->dateTimeBetween('-3 months', '+1 month');
        $endDate = (clone $startDate)->modify('+' . $subscriptionType->validity_days . ' days');
        
        $creditsUsed = $this->faker->numberBetween(0, $subscriptionType->credits_included);
        $creditsRemaining = max(0, $subscriptionType->credits_included - $creditsUsed);

        return [
            'client_id' => Client::factory(),
            'subscription_type_id' => $subscriptionType->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'credits_remaining' => $creditsRemaining,
            'credits_total' => $subscriptionType->credits_included,
            'amount_paid' => $subscriptionType->price,
            'status' => $this->faker->randomElement(['active', 'expired']),
        ];
    }

    /**
     * Indicate that the subscription is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'start_date' => now()->subDays(random_int(1, 30)),
            'end_date' => now()->addDays(random_int(1, 60)),
        ]);
    }

    /**
     * Indicate that the subscription has low credits.
     */
    public function lowCredits(): static
    {
        return $this->state(fn (array $attributes) => [
            'credits_remaining' => random_int(1, 2),
            'status' => 'active',
        ]);
    }
}