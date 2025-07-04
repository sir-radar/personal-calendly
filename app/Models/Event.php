<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['name', 'start_date', 'end_date', 'start_time', 'end_time', 'recurrent'];

    protected $hidden = ['created_at', 'updated_at'];
}
