<?php

namespace App\Http\Controllers\Nurses;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;

class NursePatientController extends Controller
{

    public function addPatientIndex()
    {
        return inertia('Nurses/nursePatient/NurseAddPatient');
    }

    public function addPatientSubmit(Request $request){

        $request->validate([
            'name' => 'required',
            'patientId' => 'required',
            'age' => 'required',
            'phoneNo' => 'required',
            'email' => 'required',
            'stateOfOrigin' => 'required',
            'lgaOfOrigin'=> 'required',
            'residentialState' => 'required',
            'residentialLga' => 'required'
        ]);

        Patient::create([
        'name' => $request->name,
        'patient_id' => $request->patientId,
        'age' => $request->age,
        'phone_no' => $request->phoneNo,
        'email' => $request->email,
        'state_of_origin' => $request->stateOfOrigin,
        'lga_of_origin' => $request->lgaOfOrigin,
        'residential_state' => $request->residentialState,
        'residential_lga' => $request->residentialLga
     ]);
    }

    public function viewPatientIndex()
    {
        return inertia('Nurses/nursePatient/NurseViewPatient/NurseViewPatient');
    }
    public function viewPatientIndexData()
    {
        $patient = Patient::query();

        if (request('searchValue')) {
            $patient->orWhere('name', 'LIKE', '%' . request('searchValue') . '%')
                ->orWhere('patient_id', 'LIKE', '%' . request('searchValue') . '%');
        }

        return response($patient->orderBy('created_at', 'ASC')->paginate(10));
    }
    public function viewPatientInfo()
    {
        $info = Patient::find(request('id'));

        return response($info);
    }
}
