<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['name', 'user_id', 'start_date', 'end_date', 'start_time', 'end_time', 'recurrent', 'recurrent_type', 'include_weekends'];

    protected $hidden = ['created_at', 'updated_at'];

    function user()
    {
        return $this->belongsTo(User::class);
    }
}
