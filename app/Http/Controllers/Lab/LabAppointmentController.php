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
        ->where('lab_test_status', 'ongoing');

        if (request('searchValue')) {
            $appointment->whereDate('created_at', Carbon::today())
            ->where('lab_test_status', 'ongoing')
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
        ->where('lab_test_status', 'completed');

        if (request('searchValue')) {
            $appointment->whereDate('created_at', Carbon::today())
            ->where('lab_test_status', 'completed')
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
            'testResult' => 'required'
        ]);
        if($validate){
            $appointment = Appointment::find($req->id);
            $appointment->lab_test_result = $req->testResult;
            $appointment->lab_test_status = 'completed';
            $appointment->lab_staff_name = $req->staffName;
            $appointment->update();
        }
    }
    public function allAppointmentIndex()
    {
        return inertia('Lab/labAppointment/AllAppointment/AllAppointment');
    }
    public function ongoingAllAppointment()
    {
        $appointment = Appointment::query();
        $appointment->where('lab_test_status', 'ongoing');

        if (request('searchValue')) {
            $appointment->where('lab_test_status', 'ongoing')
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
            'testResult' => 'required'
        ]);
        if($validate){
            $appointment = Appointment::find($req->id);
            $appointment->lab_test_result = $req->testResult;
            $appointment->lab_test_status = 'completed';
            $appointment->lab_staff_name = $req->staffName;
            $appointment->update();
        }
    }
    public function completedAllAppointment()
    {
        $appointment = Appointment::query();
        $appointment->where('lab_test_status', 'completed');

        if (request('searchValue')) {
            $appointment->where('lab_test_status', 'completed')
            ->where(function($q){
                return $q
                ->orWhere('patient_name', 'LIKE', '%' . request('searchValue') . '%')
                ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
            });
        }
        return response($appointment->orderBy('created_at', 'ASC')->paginate(10));
    }

}
