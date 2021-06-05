<?php

namespace App\Http\Controllers\Doctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function dashboardIndex()
    {
        return inertia('Doctors/DoctorDashboard');
    }
}
