<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'patient_id',
        'age',
        'phone_no',
        'email',
        'state_of_origin',
        'lga_of_origin',
        'residential_state',
        'residential_lga'
    ];
}
