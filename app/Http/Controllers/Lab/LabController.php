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
        $appointment->whereDate('created_at', Carbon::today());
        $appointment->where('lab_test_status', 'ongoing');
        return response($appointment->count());
    }

    public function completedTodayCount()
    {
        $appointment = Appointment::query();
        $appointment->whereDate('created_at', Carbon::today());
        $appointment->where('lab_test_status', 'completed');
        return response($appointment->count());
    }
    public function allOngoingTodayCount()
    {
        $appointment = Appointment::query();
        $appointment->where('lab_test_status', 'ongoing');
        return response($appointment->count());
    }
}
