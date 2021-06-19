<?php

use App\Http\Controllers\Pharmacy\PharmacyAppointmentController;
use App\Http\Controllers\Pharmacy\PharmacyController;
use Illuminate\Support\Facades\Route;

Route::get('/pharmacyDashboard', [PharmacyController::class, 'pharmacyDashboardIndex'])->name('pharmacyDashboard');
Route::get('pharmacyOngoingTodayAppointmentCount', [PharmacyController::class, 'ongoingTodayCount']);
Route::get('pharmacyCompletedTodayAppointmentCount', [PharmacyController::class, 'completedTodayCount']);
Route::get('pharmacyAllOngoingAppointmentCount', [PharmacyController::class, 'allOngoingCount']);

Route::get('pharmacyFetchAppointmentId', [PharmacyAppointmentController::class, 'fetchAppointmentId']);

// appointment today
Route::get('/pharmacyTodayAppointment', [PharmacyAppointmentController::class, 'todayAppointmentIndex']);
Route::get('pharmacyTodayOngoingAppointment', [PharmacyAppointmentController::class, 'ongoingTodayAppointment']);
Route::get('pharmacyTodayCompletedAppointment', [PharmacyAppointmentController::class, 'completedTodayAppointment']);
Route::post('pharmacyTodayOngoingResultSubmit', [PharmacyAppointmentController::class, 'ongoingTodayResultSubmit']);
// appointment all
Route::get('/pharmacyAllAppointment', [PharmacyAppointmentController::class, 'allAppointmentIndex']);
Route::get('pharmacyAllOngoingAppointment', [PharmacyAppointmentController::class, 'ongoingAllAppointment']);
Route::post('pharmacyAllOngoingResultSubmit', [PharmacyAppointmentController::class, 'ongoingAllResultSubmit']);
Route::get('pharmacyAllCompletedAppointment', [PharmacyAppointmentController::class, 'completedAllAppointment']);
