<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PharmacyController extends Controller
{
    public function pharmacyDashboardIndex()
    {
       return inertia('Pharmacy/PharmacyDashboard');
    }
    public function ongoingTodayCount()
    {
        $appointment = Appointment::query();
        $appointment->whereDate('created_at', Carbon::today());
        $appointment->where('pharmacy_status', 'ongoing');
        return response($appointment->count());
    }

    public function completedTodayCount()
    {
        $appointment = Appointment::query();
        $appointment->whereDate('created_at', Carbon::today());
        $appointment->where('pharmacy_status', 'completed');
        return response($appointment->count());
    }
    public function allOngoingCount()
    {
        $appointment = Appointment::query();
        $appointment->where('pharmacy_status', 'ongoing');
        return response($appointment->count());
    }
}
