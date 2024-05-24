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
        'birth_place',
        'cap',
        'email',
        'extra'
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
