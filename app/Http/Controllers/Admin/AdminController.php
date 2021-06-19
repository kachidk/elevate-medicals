<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboardIndex()
    {
        return inertia('Admin/AdminDashboard');
    }
}
