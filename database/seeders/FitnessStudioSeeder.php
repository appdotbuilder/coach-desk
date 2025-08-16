<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Workout;
use App\Models\WorkoutClient;
use Illuminate\Database\Seeder;

class FitnessStudioSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create clients with different subscription types
        $clients = Client::factory()->count(20)->create();
        
        // Create some clients with low credits for testing notifications
        Client::factory()->count(3)->create([
            'credits_remaining' => 0,
            'status' => 'active'
        ]);
        
        Client::factory()->count(2)->create([
            'credits_remaining' => 1,
            'status' => 'active'
        ]);

        // Create workouts
        $workouts = collect();
        
        // Create past workouts (completed)
        $pastWorkouts = Workout::factory()->count(10)->create([
            'scheduled_at' => fake()->dateTimeBetween('-30 days', '-1 day'),
            'status' => 'completed'
        ]);
        $workouts = $workouts->merge($pastWorkouts);
        
        // Create current and future workouts
        $futureWorkouts = Workout::factory()->count(15)->create([
            'scheduled_at' => fake()->dateTimeBetween('now', '+30 days'),
            'status' => 'active'
        ]);
        $workouts = $workouts->merge($futureWorkouts);

        // Create today's workouts
        $todayWorkouts = Workout::factory()->count(3)->create([
            'scheduled_at' => fake()->dateTimeBetween('today', 'tomorrow'),
            'status' => 'active'
        ]);
        $workouts = $workouts->merge($todayWorkouts);

        // Create workout-client bookings
        foreach ($workouts as $workout) {
            // Random number of bookings per workout (50-90% capacity)
            $bookingCount = fake()->numberBetween(
                (int) ($workout->capacity * 0.5), 
                (int) ($workout->capacity * 0.9)
            );
            
            // Select random clients for this workout
            $selectedClients = $clients->random(min($bookingCount, $clients->count()));
            
            foreach ($selectedClients as $client) {
                WorkoutClient::factory()->create([
                    'workout_id' => $workout->id,
                    'client_id' => $client->id,
                    'attended' => $workout->status === 'completed' 
                        ? fake()->boolean(80) // 80% attendance for past workouts
                        : false,
                    'booking_date' => fake()->dateTimeBetween($workout->created_at, $workout->scheduled_at),
                ]);
            }
        }

        $this->command->info('Fitness studio data seeded successfully!');
        $this->command->info("Created {$clients->count()} clients");
        $this->command->info("Created {$workouts->count()} workouts");
        $this->command->info("Created " . WorkoutClient::count() . " bookings");
        $this->command->info("Low credit clients: " . Client::where('credits_remaining', '<', 2)->count());
    }
}