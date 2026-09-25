<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentGateway extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'provider',
        'enabled',
        'test_mode',
        'public_key',
        'secret_key',
        'webhook_secret',
        'configuration',
        'sort_order',
    ];

    protected $casts = [
        'enabled' => 'boolean',
        'test_mode' => 'boolean',
        'configuration' => 'array',
    ];

    protected $hidden = [
        'secret_key',
        'webhook_secret',
    ];
}
