<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        User::factory()->create([
            'name' => 'Coach Admin',
            'email' => 'coach@coachdesk.com',
        ]);

        // Seed fitness studio data
        $this->call(FitnessStudioSeeder::class);
    }
}
