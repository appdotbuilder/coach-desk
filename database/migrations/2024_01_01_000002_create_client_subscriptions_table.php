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
        Schema::create('client_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subscription_type_id')->constrained()->cascadeOnDelete();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('credits_remaining');
            $table->integer('credits_total')->comment('Total credits purchased');
            $table->decimal('amount_paid', 8, 2);
            $table->enum('status', ['active', 'expired', 'cancelled'])->default('active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('client_id');
            $table->index('subscription_type_id');
            $table->index('status');
            $table->index('end_date');
            $table->index(['client_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_subscriptions');
    }
};