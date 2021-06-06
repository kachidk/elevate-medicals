<?php
use App\Http\Controllers\Nurses\NurseController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Nurses\NursePatientController;
use App\Http\Controllers\Nurses\NurseAppointmentController;


Route::get('/nurseDashboard', [NurseController::class, 'dashboardIndex'])->name('nurseDashboard');

//  patient
Route::get('/nurseAddPatient', [NursePatientController::class, 'addPatientIndex']);
Route::post('nurseAddPatientSubmit', [NursePatientController::class, 'addPatientSubmit']);
Route::get('/nurseViewPatient', [NursePatientController::class, 'viewPatientIndex']);
Route::get('nurseViewPatientData', [NursePatientController::class, 'viewPatientIndexData']);
Route::get('/nurseViewPatientInfo', [NursePatientController::class, 'viewPatientInfo']);

// appointment
Route::get('/nurseAddAppointment', [NurseAppointmentController::class, 'addAppointmentIndex']);
Route::post('/nurseAddAppointmentSubmit', [NurseAppointmentController::class, 'addAppointmentSubmit']);
// apponitment today
Route::get('/nurseTodayAppointment', [NurseAppointmentController::class, 'todayAppointmentIndex']);
// appointment today ongoing
Route::get('nurseOngoingTodayAppointment', [NurseAppointmentController::class, 'ongoingTodayAppointmentIndex']);
Route::get('nurseTodayOngoingInfo', [NurseAppointmentController::class, 'viewTodayOngoingData']);
// appointment today completed
Route::get('nurseTodayCompletedAppointment', [NurseAppointmentController::class, 'completedTodayAppointmentIndex']);
Route::get('nurseTodayCompletedInfo', [NurseAppointmentController::class, 'viewTodayCompletedData']);
// appointment all
Route::get('/nurseAllAppointment', [NurseAppointmentController::class, 'allAppointmentIndex']);
Route::get('nurseAllOngoingAppointment', [NurseAppointmentController::class, 'ongoingAllAppointmentIndex']);
Route::get('nurseAllOngoingInfo', [NurseAppointmentController::class, 'viewAllOngoingData']);
Route::get('nurseAllCompletedAppointment', [NurseAppointmentController::class, 'completedAllAppointmentIndex']);
Route::get('nurseAllCompletedInfo', [NurseAppointmentController::class, 'viewAllCompletedData']);


