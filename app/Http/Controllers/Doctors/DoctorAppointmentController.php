<?php

namespace App\Http\Controllers\Doctors;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DoctorAppointmentController extends Controller
{
    // appointment today
    public function todayAppointmentIndex(){
        return inertia('Doctors/doctorAppointment/TodayAppointment/TodayAppointment');
    }
    public function ongoingTodayAppointmentIndex()
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

    public function completedTodayAppointmentIndex()
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

    // appointment id
    public function fetchAppointmentId()
    {
        $info = Appointment::find(request('id'));
        return response($info);
    }

    // appointment all
    public function allAppointmentIndex()
    {
        return  inertia('Doctors/doctorAppointment/AllAppointment/AllAppointment');
    }

    public function ongoingAllAppointmentIndex()
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

    public function completedAllAppointmentIndex(){
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

    public function ongoingTodayCount()
    {
        $appointment = Appointment::query();
        $appointment->where('status', 'ongoing');
        $appointment->whereDate('created_at', Carbon::today());
        return response($appointment->count());
    }

    public function completedTodayCount()
    {
        $appointment = Appointment::query();
        $appointment->where('status', 'completed');
        $appointment->whereDate('created_at', Carbon::today());
        return response($appointment->count());
    }

    public function diagnosisSubmit(Request $req)
    {
        $req->validate([
            'patientComplain' => 'required',
            'diagnosis' => 'required',
            'prescription' => 'required',
            'labTest' => 'required',
            'admit' => 'required'
        ]);
        $appointment = Appointment::find($req->appointmentId);
        $appointment->doctor_name = $req->doctorName;
        $appointment->doctor_id = $req->doctorId;
        $appointment->doctor_patient_complain = $req->patientComplain;
        $appointment->doctor_diagnosis = $req->diagnosis;
        $appointment->doctor_prescription = $req->prescription;
        $appointment->doctor_test_status = $req->labTest;
        $appointment->doctor_admission_status = $req->admit;
        $appointment->status = $req->appointmentStatus;
        $appointment->doctor_test_description = $req->labTestDescription;
        $appointment->update();

        return redirect()->back();
    }
}
