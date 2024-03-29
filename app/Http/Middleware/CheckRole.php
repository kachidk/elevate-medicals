<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        if ($role == 'admin' && auth()->user()->role != 'admin' ) {
            abort(403);
        }
        if ($role == 'patient' && auth()->user()->role != 'patient' ) {
            abort(403);
        }
        if ($role == 'doctor' && auth()->user()->role != 'doctor' ) {
            abort(403);
        }
        if ($role == 'nurse' && auth()->user()->role != 'nurse' ) {
            abort(403);
        }
        if ($role == 'pharmacy' && auth()->user()->role != 'pharmacy' ) {
            abort(403);
        }
        if ($role == 'lab' && auth()->user()->role != 'lab' ) {
            abort(403);
        }
        return $next($request);
    }
}
