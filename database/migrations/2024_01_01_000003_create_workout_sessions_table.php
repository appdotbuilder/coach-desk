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
        Schema::create('workout_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->foreignId('client_subscription_id')->constrained()->cascadeOnDelete();
            $table->datetime('scheduled_at');
            $table->integer('duration_minutes')->default(60);
            $table->enum('session_type', ['personal_training', 'group_training', 'consultation', 'assessment'])->default('personal_training');
            $table->text('notes')->nullable();
            $table->enum('status', ['scheduled', 'completed', 'cancelled', 'no_show'])->default('scheduled');
            $table->datetime('completed_at')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('client_id');
            $table->index('client_subscription_id');
            $table->index('scheduled_at');
            $table->index('status');
            $table->index(['client_id', 'scheduled_at']);
            $table->index(['status', 'scheduled_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_sessions');
    }
};