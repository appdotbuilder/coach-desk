<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\WorkoutClient
 *
 * @property int $id
 * @property int $workout_id
 * @property int $client_id
 * @property bool $attended
 * @property bool $credits_deducted
 * @property \Illuminate\Support\Carbon $booking_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Workout $workout
 * @property-read \App\Models\Client $client
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient whereWorkoutId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient whereAttended($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient whereCreditsDeducted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient whereBookingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutClient whereUpdatedAt($value)
 * @method static \Database\Factories\WorkoutClientFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class WorkoutClient extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'workout_clients';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'workout_id',
        'client_id',
        'attended',
        'credits_deducted',
        'booking_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'attended' => 'boolean',
        'credits_deducted' => 'boolean',
        'booking_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the workout for this booking.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function workout(): BelongsTo
    {
        return $this->belongsTo(Workout::class);
    }

    /**
     * Get the client for this booking.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Mark attendance and deduct credits if not already done.
     *
     * @return void
     */
    public function markAttendance(): void
    {
        $this->attended = true;
        
        if (!$this->credits_deducted && $this->client->activeSubscription) {
            $subscription = $this->client->activeSubscription;
            if ($subscription->credits_remaining > 0) {
                $subscription->decrement('credits_remaining');
                $this->credits_deducted = true;
            }
        }
        
        $this->save();
    }
}