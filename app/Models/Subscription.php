<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $table = 'subscription';


    protected $fillable = [
        'course_id',
        'customer_id',
        'exam_result',
        'subscription_date',
        'price',
    ];


    /**
     * Get the course associated with the subscription.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the customer associated with the subscription.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }


    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
