<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Doctors\DoctorController;
use App\Http\Controllers\Doctors\DoctorAppointmentController;


Route::get('/doctorDashboard', [DoctorController::class, 'dashboardIndex'])->name('doctorDashboard');

Route::get('/doctorTodayAppointment', [DoctorAppointmentController::class, 'todayAppointmentIndex']);
Route::get('doctorTodayOngoingAppointment', [DoctorAppointmentController::class, 'ongoingTodayAppointmentIndex']);
Route::get('doctorTodayCompletedAppointment', [DoctorAppointmentController::class, 'completedTodayAppointmentIndex']);

Route::get('doctorFetchAppointmentId', [DoctorAppointmentController::class, 'fetchAppointmentId']);

Route::get('/doctorAllAppointment', [DoctorAppointmentController::class, 'allAppointmentIndex']);
Route::get('doctorAllOngoingAppointment', [DoctorAppointmentController::class, 'ongoingAllAppointmentIndex']);
Route::get('doctorAllCompletedAppointment', [DoctorAppointmentController::class, 'completedAllAppointmentIndex']);

