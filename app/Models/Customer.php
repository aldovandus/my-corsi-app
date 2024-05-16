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
        'ragsociale',
        'birth_date',
        ''
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

}
