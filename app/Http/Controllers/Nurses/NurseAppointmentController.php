<?php

namespace App\Http\Controllers\Nurses;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NurseAppointmentController extends Controller
{
    public function addAppointmentIndex(){
        return inertia('Nurses/nurseAppointment/NurseAddAppointment/NurseAddAppointment');
    }
    public function viewPatientIndexData(){
        $patient = Patient::query();

        if (request('searchValue')) {
            $patient->orWhere('name', 'LIKE', '%' . request('searchValue') . '%')
                ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
        }

        return response($patient->orderBy('created_at', 'ASC')->paginate(10));
    }
    public function addAppointmentSubmit(Request $request){
        $request->validate([
            'patientName' => 'required',
            'patientId' => 'required',
            'age' => 'required',
            'vitalTemperature' => 'required',
            'vitalBloodPressure' => 'required',
            'vitalWeight' => 'required',
            'nurseName'=> 'required',
            'nurseId' => 'required',
            'status' => 'required'
        ]);
        Appointment::create([
            'patient_name' => $request->patientName,
            'patient_id' => $request->patientId,
            'patient_age' => $request->age,
            'nurse_vital_temperature' => $request->vitalTemperature,
            'nurse_vital_blood_pressure' => $request->vitalBloodPressure,
            'nurse_vital_weight' => $request->vitalWeight,
            'nurse_name' => $request->nurseName,
            'nurse_users_db_id' => $request->nurseId,
            'status' => $request->status
        ]);
    }

    // appointment today
    public function todayAppointmentIndex()
    {
        return inertia('Nurses/nurseAppointment/NurseTodayAppointment/NurseTodayAppointment');
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
    public function viewTodayCompletedData(){
        $info = Appointment::find(request('id'));
        return response($info);
    }
    public function viewTodayOngoingData()
    {
        $info = Appointment::find(request('id'));
        return response($info);
    }

    // appointment all
    public function allAppointmentIndex()
    {
        return  inertia('Nurses/nurseAppointment/NurseAllAppointment/NurseAllAppointment');
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
    public function viewAllOngoingData()
    {
        $info = Appointment::find(request('id'));
        return response($info);
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
    public function viewAllCompletedData(){
        $info = Appointment::find(request('id'));
        return response($info);
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
}
