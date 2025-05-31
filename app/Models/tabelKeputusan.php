<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tabelKeputusan extends Model
{
    use HasFactory;
    protected $guarded=['id'];

    protected $fillable=[
        'opt',
        'gejala',
        'kategori',
    ];

    public function kategori(){
        return $this->belongsTo(kategoriGejala::class, 'kategori', 'id');
    }

    public function opt(){
        return $this->belongsTo(optPadi::class, 'opt' , 'id');
    }

    public function gejala(){
        return $this->belongsTo(gejalaOptPadi::class, 'gejala', 'id');
    }
}
