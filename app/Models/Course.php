<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $table = 'course';


    protected $fillable = [
        'code',
        'name',
        'title',
        'description',
        'price',
        'startDate',
        'endDate',
        'extra',
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
