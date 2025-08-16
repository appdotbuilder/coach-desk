<?php

namespace Database\Factories;

use App\Models\SubscriptionType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubscriptionType>
 */
class SubscriptionTypeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\SubscriptionType>
     */
    protected $model = SubscriptionType::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $plans = [
            ['name' => 'Basic Plan', 'credits' => 4, 'price' => 120.00, 'days' => 30],
            ['name' => 'Premium Plan', 'credits' => 8, 'price' => 200.00, 'days' => 30],
            ['name' => 'Elite Plan', 'credits' => 12, 'price' => 300.00, 'days' => 30],
            ['name' => 'Drop-in Session', 'credits' => 1, 'price' => 35.00, 'days' => 7],
            ['name' => 'Weekly Package', 'credits' => 2, 'price' => 65.00, 'days' => 7],
        ];

        $plan = $this->faker->randomElement($plans);

        return [
            'name' => $plan['name'],
            'description' => "Perfect for clients looking to " . $this->faker->randomElement([
                'get started with personal training',
                'maintain their fitness routine',
                'achieve serious fitness goals',
                'try our services flexibly'
            ]),
            'credits_included' => $plan['credits'],
            'price' => $plan['price'],
            'validity_days' => $plan['days'],
            'status' => 'active',
        ];
    }

    /**
     * Indicate that the subscription type is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}