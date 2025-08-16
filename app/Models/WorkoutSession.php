<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\WorkoutSession
 *
 * @property int $id
 * @property int $client_id
 * @property int $client_subscription_id
 * @property \Illuminate\Support\Carbon $scheduled_at
 * @property int $duration_minutes
 * @property string $session_type
 * @property string|null $notes
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Client $client
 * @property-read \App\Models\ClientSubscription $clientSubscription
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereClientSubscriptionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereDurationMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereSessionType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession scheduled()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession completed()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutSession thisMonth()
 * @method static \Database\Factories\WorkoutSessionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class WorkoutSession extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'client_id',
        'client_subscription_id',
        'scheduled_at',
        'duration_minutes',
        'session_type',
        'notes',
        'status',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'scheduled_at' => 'datetime',
        'completed_at' => 'datetime',
        'duration_minutes' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the client for the workout session.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Get the subscription for the workout session.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function clientSubscription(): BelongsTo
    {
        return $this->belongsTo(ClientSubscription::class);
    }

    /**
     * Scope a query to only include scheduled sessions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled');
    }

    /**
     * Scope a query to only include completed sessions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope a query to only include sessions from this month.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeThisMonth($query)
    {
        return $query->whereBetween('scheduled_at', [
            now()->startOfMonth(),
            now()->endOfMonth()
        ]);
    }

    /**
     * Get formatted session type.
     *
     * @return string
     */
    public function getFormattedSessionTypeAttribute(): string
    {
        return str_replace('_', ' ', ucwords($this->session_type, '_'));
    }
}