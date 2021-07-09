<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Patients\PatientController;


Route::get('/patientDashboard', [PatientController::class, 'patientDashboardIndex'])->name('patientDashboard');
