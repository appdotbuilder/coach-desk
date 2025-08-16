<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Client>
     */
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'date_of_birth' => $this->faker->dateTimeBetween('-65 years', '-18 years'),
            'fitness_goals' => $this->faker->randomElement([
                'Weight loss and muscle toning',
                'Build muscle mass and strength',
                'Improve cardiovascular health',
                'Train for marathon running',
                'Rehabilitation after injury',
                'General fitness and wellness'
            ]),
            'health_conditions' => $this->faker->optional(0.3)->randomElement([
                'Previous knee injury',
                'Lower back pain',
                'High blood pressure',
                'Diabetes type 2',
                'Asthma',
                'None'
            ]),
            'emergency_contact' => $this->faker->name() . ' - ' . $this->faker->phoneNumber(),
            'subscription_type' => $this->faker->randomElement([6, 13]),
            'credits_remaining' => function (array $attributes) {
                return random_int(0, $attributes['subscription_type']);
            },
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the client is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the client is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}