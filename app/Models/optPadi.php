<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class optPadi extends Model
{
    use HasFactory;
    protected $guarded=['id'];

    protected $fillable=[
        'kodeOpt',
        'opt',
        'nama_latin',
        'deskripsi',
        'gambar',
    ];

    public function tabelKeputusan_opt(){
        return $this->hasMany(tabelKeputusan::class);
    }

    public function penanggulangan_opt(){
        return $this->hasMany(penanggulanganOpt::class);
    }

    public function getRouteKeyName()
    {
        return 'kodeOpt';
    }

}
