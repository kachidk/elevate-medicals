<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboardIndex()
    {
        return inertia('Admin/AdminDashboard');
    }
    public function usersCount()
    {
        $patient = User::where('role', 'patient')->count();
        $nurse = User::where('role', 'nurse')->count();
        $doctor = User::where('role', 'doctor')->count();
        $lab = User::where('role', 'lab')->count();
        $pharmacy = User::where('role', 'pharmacy')->count();
        $admin = User::where('role', 'admin')->count();
        return response()->json([
            'patient' => $patient,
            'nurse' => $nurse,
            'doctor' => $doctor,
            'lab' => $lab,
            'pharmacy' => $pharmacy,
            'admin' => $admin
        ]);
    }
}
