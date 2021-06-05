<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_name',
        'patient_id',
        'patient_age',
        'status',
        'nurse_vital_temperature',
        'nurse_vital_blood_pressure',
        'nurse_vital_weight',
        'nurse_name',
        'nurse_id',
        'doctor_name',
        'doctor_id',
        'doctor_patient_complain',
        'doctor_diagnosis',
        'doctor_admission_status',
        'doctor_test_status',
        'doctor_prescription',
    ];
}
