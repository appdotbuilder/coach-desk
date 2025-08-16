<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('workout_clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workout_id')->constrained()->onDelete('cascade');
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->boolean('attended')->default(false);
            $table->boolean('credits_deducted')->default(false);
            $table->dateTime('booking_date');
            $table->timestamps();
            
            // Prevent duplicate bookings
            $table->unique(['workout_id', 'client_id']);
            
            // Indexes for performance
            $table->index('workout_id');
            $table->index('client_id');
            $table->index('attended');
            $table->index('booking_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_clients');
    }
};