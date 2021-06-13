<?php

namespace App\Http\Controllers\Lab;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LabController extends Controller
{
    public function labDashboardIndex()
    {
       return inertia('Lab/LabDashboard');
    }
    public function ongoingTodayCount()
    {
        $appointment = Appointment::query();
        $appointment->where('status', 'ongoing');
        $appointment->whereDate('created_at', Carbon::today());
        $appointment->where('doctor_admission_status', 1);
        return response($appointment->count());
    }

    public function completedTodayCount()
    {
        $appointment = Appointment::query();
        $appointment->where('status', 'completed');
        $appointment->whereDate('created_at', Carbon::today());
        $appointment->where('doctor_admission_status', 1);
        return response($appointment->count());
    }
    public function allOngoingTodayCount()
    {
        $appointment = Appointment::query();
        $appointment->where('status', 'ongoing');
        $appointment->where('doctor_admission_status', 1);
        return response($appointment->count());
    }
}
