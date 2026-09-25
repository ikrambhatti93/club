<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Club extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'short_description',
        'full_description',
        'address',
        'neighborhood',
        'city',
        'postal_code',
        'opening_hours',
        'phone',
        'website',
        'map_url',
        'latitude',
        'longitude',
        'featured_image',
        'gallery_images',
        'facilities',
        'status',
        'is_featured',
        'sort_order',
        'dress_code',
        'entry_fee',
        'seo_title',
        'meta_description',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'facilities' => 'array',
        'is_featured' => 'boolean',
        'entry_fee' => 'decimal:2',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ClubCategory::class, 'category_id');
    }

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(ClubFeature::class, 'club_club_feature');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function packages(): HasMany
    {
        return $this->hasMany(Package::class, 'preferred_club_id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
