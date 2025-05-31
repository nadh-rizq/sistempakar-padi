<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class roleUser extends Model
{
    use HasFactory;
    protected $guarded=['id'];

    protected $fillable=[
        'kodeRole',
        'role',
    ];

    public function users(){
        return $this->hasMany(User::class, 'kodeRole','kodeRole');
    }
}
