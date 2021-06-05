<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Doctors\DoctorController;


Route::get('/doctorDashboard', [DoctorController::class, 'dashboardIndex'])->name('doctorDashboard');
