<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;

Route::get('/adminDashboard', [AdminController::class, 'dashboardIndex'])->name('adminDashboard');
