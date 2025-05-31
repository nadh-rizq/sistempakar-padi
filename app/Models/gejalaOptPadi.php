<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gejalaOptPadi extends Model
{
    use HasFactory;

    protected $guarded=['id'];

    protected $fillable=[
        'kodeGejala',
        'gejala',
    ];

    public function tabelKeputusan_gej(){
        return $this->hasMany(tabelKeputusan::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, function ($query, $search) {
            return $query->where('gejala', 'like', '%' . $search . '%');
        });
    }

    public function getRouteKeyName()
    {
        return 'kodeGejala';
    }
}
