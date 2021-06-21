<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminUserController;

Route::get('/adminDashboard', [AdminController::class, 'dashboardIndex'])->name('adminDashboard');
Route::get('/adminChangeRole', [AdminUserController::class, 'changeRolePage']);
Route::get('/adminFetchRole', [AdminUserController::class, 'fetchRoles']);
Route::post('adminUpdateRoleSubmit', [AdminUserController::class, 'updateRoleSubmit']);
Route::get('adminUsersCount', [AdminController::class, 'usersCount']);
