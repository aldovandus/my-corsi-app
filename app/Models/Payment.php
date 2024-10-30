<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $casts = [
        'amount' => 'decimal:2',
    ];



    protected $fillable = [
        'payment_number',
        'invoice_number',
        'method',
        'amount',
        'payment_date',
        'subscription_id'
    ];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }
}
