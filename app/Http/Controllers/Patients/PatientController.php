<?php

namespace App\Http\Controllers\Patients;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function patientDashboardIndex()
    {
        return inertia('Patients/PatientDashboard');
    }
}
