<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ClientSubscription
 *
 * @property int $id
 * @property int $client_id
 * @property int $subscription_type_id
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property int $credits_remaining
 * @property int $credits_total
 * @property string $amount_paid
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Client $client
 * @property-read \App\Models\SubscriptionType $subscriptionType
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WorkoutSession> $workoutSessions
 * @property-read int|null $workout_sessions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereAmountPaid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereCreditsRemaining($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereCreditsTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereSubscriptionTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription active()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubscription lowCredits()
 * @method static \Database\Factories\ClientSubscriptionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ClientSubscription extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'client_id',
        'subscription_type_id',
        'start_date',
        'end_date',
        'credits_remaining',
        'credits_total',
        'amount_paid',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'credits_remaining' => 'integer',
        'credits_total' => 'integer',
        'amount_paid' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the client that owns the subscription.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Get the subscription type.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function subscriptionType(): BelongsTo
    {
        return $this->belongsTo(SubscriptionType::class);
    }

    /**
     * Get all workout sessions for this subscription.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function workoutSessions(): HasMany
    {
        return $this->hasMany(WorkoutSession::class);
    }

    /**
     * Scope a query to only include active subscriptions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
            ->where('end_date', '>=', now());
    }

    /**
     * Scope a query to only include subscriptions with low credits.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $threshold
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLowCredits($query, $threshold = 3)
    {
        return $query->where('credits_remaining', '<=', $threshold)
            ->where('credits_remaining', '>', 0);
    }

    /**
     * Check if subscription is expired.
     *
     * @return bool
     */
    public function getIsExpiredAttribute(): bool
    {
        return $this->end_date->isPast();
    }

    /**
     * Get days until expiration.
     *
     * @return int
     */
    public function getDaysUntilExpirationAttribute(): int
    {
        return max(0, now()->diffInDays($this->end_date, false));
    }
}