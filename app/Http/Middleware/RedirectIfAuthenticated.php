<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  ...$guards
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
            // return redirect(RouteServiceProvider::HOME);
                if (Auth::user()->role == 'admin') {
                    return redirect('/adminDashboard');
                }
                elseif(Auth::user()->role == 'patient'){
                    return redirect('/patientDashboard');
                }
                elseif(Auth::user()->role == 'doctor'){
                    return redirect('/doctorDashboard');
                }
                elseif(Auth::user()->role == 'nurse'){
                    return redirect('/nurseDashboard');
                }
                elseif(Auth::user()->role == 'pharmacy'){
                    return redirect('/pharmacyDashboard');
                }
                elseif(Auth::user()->role == 'lab'){
                    return redirect('/labDashboard');
                }
                else{
                    return auth()->logout();
                }
            }
        }

        return $next($request);
    }
}
