<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AppointmentController;

Route::get('fetchTodayOngoingAppointment', [AppointmentController::class, 'fetchTodayOngoingAppointment']);
Route::get('fetchTodayCompletedAppointment', [AppointmentController::class, 'fetchTodayCompletedAppointment']);

Route::get('fetchAppointmentId', [AppointmentController::class, 'fetchAppointmentId']);

Route::get('fetchAllOngoingAppointment', [AppointmentController::class, 'fetchAllOngoingAppointment']);

