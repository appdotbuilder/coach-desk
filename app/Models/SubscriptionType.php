<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\SubscriptionType
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int $credits_included
 * @property string $price
 * @property int $validity_days
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ClientSubscription> $clientSubscriptions
 * @property-read int|null $client_subscriptions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType whereCreditsIncluded($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType whereValidityDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionType active()
 * @method static \Database\Factories\SubscriptionTypeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class SubscriptionType extends Model
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
        'credits_included',
        'price',
        'validity_days',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'credits_included' => 'integer',
        'validity_days' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all client subscriptions for this subscription type.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function clientSubscriptions(): HasMany
    {
        return $this->hasMany(ClientSubscription::class);
    }

    /**
     * Scope a query to only include active subscription types.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get formatted price with currency symbol.
     *
     * @return string
     */
    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format((float) $this->price, 2);
    }
}