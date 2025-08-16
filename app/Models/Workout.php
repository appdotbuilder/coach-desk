<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Workout
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon $scheduled_at
 * @property int $capacity
 * @property string $instructor
 * @property int $duration_minutes
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Client> $clients
 * @property-read int|null $clients_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WorkoutClient> $workoutClients
 * @property-read int|null $workout_clients_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Workout newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Workout newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Workout query()
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereInstructor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereDurationMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Workout active()
 * @method static \Database\Factories\WorkoutFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Workout extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'scheduled_at',
        'capacity',
        'instructor',
        'duration_minutes',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'scheduled_at' => 'datetime',
        'capacity' => 'integer',
        'duration_minutes' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all clients attending this workout.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class, 'workout_clients')
            ->withPivot('attended', 'credits_deducted', 'booking_date')
            ->withTimestamps();
    }

    /**
     * Get workout client bookings.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function workoutClients()
    {
        return $this->hasMany(WorkoutClient::class);
    }

    /**
     * Scope a query to only include active workouts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get available spots for this workout.
     *
     * @return int
     */
    public function getAvailableSpotsAttribute(): int
    {
        return $this->capacity - $this->workoutClients()->count();
    }

    /**
     * Check if workout is full.
     *
     * @return bool
     */
    public function isFullAttribute(): bool
    {
        return $this->available_spots <= 0;
    }
}