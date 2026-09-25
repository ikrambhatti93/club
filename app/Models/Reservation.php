<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_reference',
        'customer_id',
        'club_id',
        'package_id',
        'guest_name',
        'guest_email',
        'guest_phone',
        'guest_whatsapp',
        'reservation_date',
        'preferred_time',
        'number_of_guests',
        'pickup_requested',
        'pickup_location',
        'pickup_vehicle_type',
        'total_amount',
        'deposit_amount',
        'currency',
        'status',
        'customer_notes',
        'admin_notes',
        'consent_terms',
        'is_age_confirmed',
        'source_channel',
    ];

    protected $casts = [
        'reservation_date' => 'date',
        'pickup_requested' => 'boolean',
        'consent_terms' => 'boolean',
        'is_age_confirmed' => 'boolean',
        'total_amount' => 'decimal:2',
        'deposit_amount' => 'decimal:2',
        'number_of_guests' => 'integer',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(ReservationItem::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(ReservationNote::class)->latest();
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public static function generateReference(): string
    {
        return 'BCN-' . date('Y') . '-' . strtoupper(substr(uniqid(), -5));
    }
}
