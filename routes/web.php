<?php

use App\Http\Controllers\shared\profileController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::inertia('/test', 'Test');

Route::group(['middleware' => 'auth'], function() {
    Route::inertia('/home', 'Home')->name('home');

    Route::get('/profile', [profileController::class, 'index'])->name('profile');
    Route::delete('/profilePhotoDelete', [profileController::class, 'deleteProfilePhoto'])->name('profilePhotoDelete');
    Route::put('/profilePhotoUpdate', [profileController::class, 'updateProfilePhoto'])->name('profilePhotoUpdate');
    Route::delete('/profileDelete', [profileController::class, 'deleteProfile'])->name('profileDelete');


    Route::group(['middleware' => 'role:admin'], function() {
        require 'custom/adminRoute.php';
    });
    Route::group(['middleware' => 'role:patient'], function() {
        require 'custom/patientRoute.php';
    });
    Route::group(['middleware' => 'role:doctor'], function() {
        require 'custom/doctorRoute.php';
    });
    Route::group(['middleware' => 'role:nurse'], function() {
        require 'custom/nurseRoute.php';
    });
    Route::group(['middleware' => 'role:pharmacy'], function() {
        require 'custom/pharmacyRoute.php';
    });
    Route::group(['middleware' => 'role:lab'], function() {
        require 'custom/labRoute.php';
    });
    require 'api/global.php';

    Route::get('/linkstorage', function () {
    Artisan::call('storage:link');
});
});
