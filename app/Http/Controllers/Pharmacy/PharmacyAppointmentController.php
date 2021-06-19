<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PharmacyAppointmentController extends Controller
{
    public function todayAppointmentIndex()
    {
        return inertia('Pharmacy/pharmacyAppointment/TodayAppointment/TodayAppointment');
    }

    // appointment today
    public function ongoingTodayAppointment()
    {
        $appointment = Appointment::query();
        $appointment->whereDate('created_at', Carbon::today())
        ->where('pharmacy_status', 'ongoing');

        if (request('searchValue')) {
            $appointment->whereDate('created_at', Carbon::today())
            ->where('pharmacy_status', 'ongoing')
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
        ->where('pharmacy_status', 'completed');

        if (request('searchValue')) {
            $appointment->whereDate('created_at', Carbon::today())
            ->where('pharmacy_status', 'completed')
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

    public function ongoingTodayResultSubmit(Request $req)
    {
        $validate = $req->validate([
            'pharmacyComment' => 'required'
        ]);
        if($validate){
            $appointment = Appointment::find($req->id);
            $appointment->pharmacy_staff_comment = $req->pharmacyComment;
            $appointment->pharmacy_status = 'completed';
            $appointment->pharmacy_staff_name = auth()->user()->name;
            $appointment->pharmacy_staff_users_db_id = auth()->user()->id;
            $appointment->update();
        }
    }

    // appointment all
    public function allAppointmentIndex()
    {
        return inertia('Pharmacy/pharmacyAppointment/AllAppointment/AllAppointment');
    }
    public function ongoingAllAppointment()
    {
        $appointment = Appointment::query();
        $appointment->where('pharmacy_status', 'ongoing');

        if (request('searchValue')) {
            $appointment->where('pharmacy_status', 'ongoing')
                ->where(function($q){
                    return $q
                    ->orWhere('patient_name', 'LIKE', '%' . request('searchValue') . '%')
                    ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
                });
        }
        return response($appointment->orderBy('created_at', 'ASC')->paginate(10));
    }
    public function ongoingAllResultSubmit(Request $req)
    {
        $validate = $req->validate([
            'pharmacyComment' => 'required'
        ]);
        if($validate){
            $appointment = Appointment::find($req->id);
            $appointment->pharmacy_staff_comment = $req->pharmacyComment;
            $appointment->pharmacy_status = 'completed';
            $appointment->pharmacy_staff_name = auth()->user()->name;
            $appointment->pharmacy_staff_users_db_id = auth()->user()->id;
            $appointment->update();
        }
    }
    public function completedAllAppointment()
    {
        $appointment = Appointment::query();
        $appointment->where('pharmacy_status', 'completed');

        if (request('searchValue')) {
            $appointment->where('pharmacy_status', 'completed')
            ->where(function($q){
                return $q
                ->orWhere('patient_name', 'LIKE', '%' . request('searchValue') . '%')
                ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
            });
        }
        return response($appointment->orderBy('created_at', 'ASC')->paginate(10));
    }
}
