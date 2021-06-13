<?php

use App\Http\Controllers\Lab\LabController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Lab\LabAppointmentController;

Route::get('/labDashboard', [LabController::class, 'labDashboardIndex'])->name('labDashboard');
Route::get('labOngoingTodayAppointmentCount', [LabController::class, 'ongoingTodayCount']);
Route::get('labCompletedTodayAppointmentCount', [LabController::class, 'completedTodayCount']);
Route::get('labAllOngoingTodayAppointmentCount', [LabController::class, 'allOngoingTodayCount']);

Route::get('labFetchAppointmentId', [LabAppointmentController::class, 'fetchAppointmentId']);

// appointment today
Route::get('/labTodayAppointment', [LabAppointmentController::class, 'todayAppointmentIndex']);
Route::get('labTodayOngoingAppointment', [LabAppointmentController::class, 'ongoingTodayAppointment']);
Route::get('labTodayCompletedAppointment', [LabAppointmentController::class, 'completedTodayAppointment']);
Route::post('labTodayOngoingResultSubmit', [LabAppointmentController::class, 'ongoingTodayResultSubmit']);
// appointment all
Route::get('/labAllAppointment', [LabAppointmentController::class, 'allAppointmentIndex']);
Route::get('labAllOngoingAppointment', [LabAppointmentController::class, 'ongoingAllAppointment']);
Route::post('labAllOngoingResultSubmit', [LabAppointmentController::class, 'ongoingAllResultSubmit']);
Route::get('labAllCompletedAppointment', [LabAppointmentController::class, 'completedAllAppointment']);
