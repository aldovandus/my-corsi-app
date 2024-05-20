<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'cf',
        'phone',
        'birth_date',
        'email'
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

}
