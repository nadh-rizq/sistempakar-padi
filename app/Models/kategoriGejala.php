<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kategoriGejala extends Model
{
    use HasFactory;
    protected $guarded=['id'];

    protected $fillable=[
        'kategori',
        'bobot',
    ];

    public function tabelKeputusan(){
        return $this->hasMany(tabelKeputusan::class, 'kategori', 'id');
    }
}

