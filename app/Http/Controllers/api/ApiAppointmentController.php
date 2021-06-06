<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ApiAppointmentController extends Controller
{
    public function fetchTodayOngoingAppointment()
    {
        $appointment = Appointment::query();
        $appointment->where('status', 'ongoing')->whereDate('created_at', Carbon::today());

        if (request('searchValue')) {
            $appointment->where('status', 'ongoing')
            ->whereDate('created_at', Carbon::today())
            ->where(function($q){
                return $q
                ->orWhere('patient_name', 'LIKE', '%' . request('searchValue') . '%')
                ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
            });
        }
        return response($appointment->orderBy('created_at', 'ASC')->paginate(10));
    }

    public function fetchTodayCompletedAppointment()
    {
        $appointment = Appointment::query();
        $appointment->where('status', 'completed')->whereDate('created_at', Carbon::today());

        if (request('searchValue')) {
            $appointment->where('status', 'completed')
            ->whereDate('created_at', Carbon::today())
            ->where(function($q){
                return $q
                ->orWhere('patient_name', 'LIKE', '%' . request('searchValue') . '%')
                ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
            });
        }
        return response($appointment->orderBy('created_at', 'ASC')->paginate(10));
    }

    public function fetchAppointmentId(){
        $info = Appointment::find(request('id'));
        return response($info);
    }

    public function fetchOngoingAllAppointment()
    {
        $appointment = Appointment::query();
        $appointment->where('status', 'ongoing');

        if (request('searchValue')) {
            $appointment->where('status', 'ongoing')
                ->where(function($q){
                    return $q
                    ->orWhere('patient_name', 'LIKE', '%' . request('searchValue') . '%')
                    ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
                });
        }

        return response($appointment->orderBy('created_at', 'ASC')->paginate(10));
    }

    public function fetchCompletedAllAppointment()
    {
        $appointment = Appointment::query();
        $appointment->where('status', 'completed');

        if (request('searchValue')) {
            $appointment->where('status', 'completed')
                ->where(function($q){
                    return $q
                    ->orWhere('patient_name', 'LIKE', '%' . request('searchValue') . '%')
                    ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
                });
        }

        return response($appointment->orderBy('created_at', 'ASC')->paginate(10));
    }
}
