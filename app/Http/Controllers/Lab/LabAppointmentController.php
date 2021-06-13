<?php

namespace App\Http\Controllers\Lab;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LabAppointmentController extends Controller
{
    public function todayAppointmentIndex()
    {
        return inertia('Lab/labAppointment/TodayAppointment/TodayAppointment');
    }

    // appointment today
    public function ongoingTodayAppointment()
    {
        $appointment = Appointment::query();
        $appointment->whereDate('created_at', Carbon::today())
        ->where('doctor_admission_status', 1);

        if (request('searchValue')) {
            $appointment->whereDate('created_at', Carbon::today())
            ->where('doctor_admission_status', 1)
            ->where(function($q){
                return $q
                ->orWhere('patient_name', 'LIKE', '%' . request('searchValue') . '%')
                ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
            });
        }
        return response($appointment->orderBy('created_at', 'ASC')->paginate(10));
    }
    public function completedTodayAppointment()
    {
        $appointment = Appointment::query();
        $appointment->whereDate('created_at', Carbon::today())
        ->where('doctor_admission_status', 0);

        if (request('searchValue')) {
            $appointment->whereDate('created_at', Carbon::today())
            ->where('doctor_admission_status', 0)
            ->where(function($q){
                return $q
                ->orWhere('patient_name', 'LIKE', '%' . request('searchValue') . '%')
                ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
            });
        }
        return response($appointment->orderBy('created_at', 'ASC')->paginate(10));
    }

    // appointment id
    public function fetchAppointmentId()
    {
        $info = Appointment::find(request('id'));
        return response($info);
    }


}
