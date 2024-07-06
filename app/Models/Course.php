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
        'title',
        'price',
        'startDate',
        'endDate',
        'startStage',
        'endDate10',
        'examDate',
        'stageLocation',
        'startTime',
        'endTime',
        'classroom',
        'extra',
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
