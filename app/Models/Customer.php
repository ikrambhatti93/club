<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'whatsapp',
        'country_code',
        'preferred_language',
        'internal_notes',
        'total_reservations',
        'total_spend',
    ];

    protected $casts = [
        'total_reservations' => 'integer',
        'total_spend' => 'decimal:2',
    ];

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class)->latest();
    }
}
