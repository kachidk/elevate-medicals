<?php

namespace App\Http\Controllers\Nurses;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NurseController extends Controller
{
    public function dashboardIndex()
    {
        return inertia('Nurses/NurseDashboard');
    }
}
