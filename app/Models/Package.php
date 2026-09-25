<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'preferred_club_id',
        'name',
        'slug',
        'short_description',
        'full_description',
        'regular_price',
        'sale_price',
        'currency',
        'min_guests',
        'max_guests',
        'duration',
        'inclusions',
        'exclusions',
        'featured_image',
        'gallery_images',
        'is_featured',
        'is_active',
        'sort_order',
        'badge',
        'seo_title',
        'meta_description',
    ];

    protected $casts = [
        'inclusions' => 'array',
        'exclusions' => 'array',
        'gallery_images' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'regular_price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'min_guests' => 'integer',
        'max_guests' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(PackageCategory::class, 'category_id');
    }

    public function preferredClub(): BelongsTo
    {
        return $this->belongsTo(Club::class, 'preferred_club_id');
    }

    public function options(): HasMany
    {
        return $this->hasMany(PackageOption::class)->orderBy('sort_order');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function getEffectivePriceAttribute(): float
    {
        return $this->sale_price !== null && $this->sale_price > 0 ? (float)$this->sale_price : (float)$this->regular_price;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
