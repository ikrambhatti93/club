<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'desktop_image',
        'mobile_image',
        'button_text',
        'button_url',
        'secondary_button_text',
        'secondary_button_url',
        'start_date',
        'end_date',
        'is_active',
        'sort_order',
        'placement',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];
}
