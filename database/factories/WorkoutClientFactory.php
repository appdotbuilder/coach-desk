<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Workout;
use App\Models\WorkoutClient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkoutClient>
 */
class WorkoutClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\WorkoutClient>
     */
    protected $model = WorkoutClient::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'workout_id' => Workout::factory(),
            'client_id' => Client::factory(),
            'attended' => $this->faker->boolean(70), // 70% chance of attendance
            'credits_deducted' => function (array $attributes) {
                return $attributes['attended'];
            },
            'booking_date' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the client attended the workout.
     *
     * @return static
     */
    public function attended(): static
    {
        return $this->state(fn (array $attributes) => [
            'attended' => true,
            'credits_deducted' => true,
        ]);
    }

    /**
     * Indicate that the client did not attend the workout.
     *
     * @return static
     */
    public function absent(): static
    {
        return $this->state(fn (array $attributes) => [
            'attended' => false,
            'credits_deducted' => false,
        ]);
    }
}