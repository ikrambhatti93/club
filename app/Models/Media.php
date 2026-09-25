<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Media extends Model
{
    use HasFactory;

    protected $table = 'media';

    protected $fillable = [
        'filename',
        'original_name',
        'mime_type',
        'path',
        'disk',
        'size',
        'width',
        'height',
        'alt_text',
        'caption',
        'folder',
    ];

    public function getUrlAttribute(): string
    {
        return asset('storage/' . $this->path);
    }
}
