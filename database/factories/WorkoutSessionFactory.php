<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\WorkoutSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkoutSession>
 */
class WorkoutSessionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\WorkoutSession>
     */
    protected $model = WorkoutSession::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subscription = ClientSubscription::inRandomOrder()->first() 
            ?? ClientSubscription::factory()->create();

        $scheduledAt = $this->faker->dateTimeBetween('-2 months', '+2 weeks');
        $status = $this->faker->randomElement(['scheduled', 'completed', 'cancelled', 'no_show']);
        $completedAt = $status === 'completed' ? $scheduledAt : null;

        return [
            'client_id' => $subscription->client_id,
            'client_subscription_id' => $subscription->id,
            'scheduled_at' => $scheduledAt,
            'duration_minutes' => $this->faker->randomElement([30, 45, 60, 90]),
            'session_type' => $this->faker->randomElement([
                'personal_training',
                'group_training',
                'consultation',
                'assessment'
            ]),
            'notes' => $this->faker->optional(0.6)->paragraph(),
            'status' => $status,
            'completed_at' => $completedAt,
        ];
    }

    /**
     * Indicate that the session is completed.
     */
    public function completed(): static
    {
        return $this->state(function (array $attributes) {
            $scheduledAt = $attributes['scheduled_at'] ?? $this->faker->dateTimeBetween('-1 month', '-1 day');
            return [
                'status' => 'completed',
                'completed_at' => $scheduledAt,
            ];
        });
    }

    /**
     * Indicate that the session is scheduled for today or future.
     */
    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'scheduled_at' => $this->faker->dateTimeBetween('now', '+2 weeks'),
            'status' => 'scheduled',
            'completed_at' => null,
        ]);
    }
}