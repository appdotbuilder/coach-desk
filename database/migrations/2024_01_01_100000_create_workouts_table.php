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
        Schema::create('workouts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->dateTime('scheduled_at');
            $table->integer('capacity')->default(20);
            $table->string('instructor');
            $table->integer('duration_minutes')->default(60);
            $table->enum('status', ['active', 'cancelled', 'completed'])->default('active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('scheduled_at');
            $table->index('status');
            $table->index(['status', 'scheduled_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workouts');
    }
};