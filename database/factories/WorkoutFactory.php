<?php

namespace Database\Factories;

use App\Models\Workout;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Workout>
 */
class WorkoutFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Workout>
     */
    protected $model = Workout::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Morning Yoga',
                'HIIT Training',
                'Pilates',
                'Strength Training',
                'Cardio Blast',
                'Functional Fitness',
                'Core Strength',
                'Boxing Fitness',
                'Dance Fitness',
                'Flexibility & Mobility'
            ]),
            'description' => $this->faker->paragraph(),
            'scheduled_at' => $this->faker->dateTimeBetween('now', '+30 days'),
            'capacity' => $this->faker->numberBetween(10, 25),
            'instructor' => $this->faker->name(),
            'duration_minutes' => $this->faker->randomElement([45, 60, 75, 90]),
            'status' => $this->faker->randomElement(['active', 'cancelled', 'completed']),
        ];
    }

    /**
     * Indicate that the workout is active.
     *
     * @return static
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the workout is completed.
     *
     * @return static
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }
}