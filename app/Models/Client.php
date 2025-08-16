<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Client
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string|null $phone
 * @property string|null $address
 * @property \Illuminate\Support\Carbon|null $date_of_birth
 * @property string|null $fitness_goals
 * @property string|null $health_conditions
 * @property string|null $emergency_contact
 * @property int $subscription_type
 * @property int $credits_remaining
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ClientSubscription> $subscriptions
 * @property-read int|null $subscriptions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WorkoutSession> $workoutSessions
 * @property-read int|null $workout_sessions_count
 * @property-read \App\Models\ClientSubscription|null $activeSubscription
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Client newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Client newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Client query()
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereDateOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereEmergencyContact($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereFitnessGoals($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereHealthConditions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client active()
 * @method static \Database\Factories\ClientFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Client extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'date_of_birth',
        'fitness_goals',
        'health_conditions',
        'emergency_contact',
        'subscription_type',
        'credits_remaining',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'subscription_type' => 'integer',
        'credits_remaining' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all subscriptions for the client.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(ClientSubscription::class);
    }

    /**
     * Get all workouts for the client.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function workouts(): BelongsToMany
    {
        return $this->belongsToMany(Workout::class, 'workout_clients')
            ->withPivot('attended', 'credits_deducted', 'booking_date')
            ->withTimestamps();
    }

    /**
     * Get workout client bookings.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function workoutClients(): HasMany
    {
        return $this->hasMany(WorkoutClient::class);
    }

    /**
     * Get the client's active subscription.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function activeSubscription()
    {
        return $this->hasOne(ClientSubscription::class)
            ->where('status', 'active')
            ->where('end_date', '>=', now())
            ->latest();
    }

    /**
     * Scope a query to only include active clients.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get subscription type name.
     *
     * @return string
     */
    public function getSubscriptionTypeNameAttribute(): string
    {
        return match($this->subscription_type) {
            6 => '6 Sessions',
            13 => '13 Sessions',
            default => 'Unknown'
        };
    }

    /**
     * Check if client has low credits (less than 2).
     *
     * @return bool
     */
    public function hasLowCreditsAttribute(): bool
    {
        return $this->credits_remaining < 2;
    }

    /**
     * Deduct one credit from the client.
     *
     * @return bool
     */
    public function deductCredit(): bool
    {
        if ($this->credits_remaining > 0) {
            $this->decrement('credits_remaining');
            return true;
        }
        return false;
    }
}