<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class penanggulanganOpt extends Model
{
    use HasFactory;
    protected $guarded=['id'];

    protected $fillable=[
        'opt',
        'pencegahan',
        'penanganan',
    ];

    public function opt(){
        return $this->belongsTo(optPadi::class, 'opt' , 'id');
    }
}
