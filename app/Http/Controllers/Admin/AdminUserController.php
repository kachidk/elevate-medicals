<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function changeRolePage()
    {
        return inertia('Admin/adminUser/ChangeRole/ChangeRole');
    }
    public function fetchRoles()
    {
        $user = User::query();
        if (request('roles')) {
            $user->where('role', request('roles'));
        }
        if (request('searchValue')) {
            $user->where(function ($q) {
                return $q
                    ->orWhere('name', 'LIKE', '%' . request('searchValue') . '%')
                    ->orWhere('email', 'LIKE', '%' . request('searchValue') . '%')
                    ->orWhere('role', request('searchValue'));
            });
        }
        return response($user->orderBy('created_at', 'ASC')->paginate(10));
    }
    public function updateRoleSubmit(Request $req)
    {
        $req->validate([
            'value' => 'required'
        ]);
        foreach ($req->id as $id_) {
            $user = User::find($id_);
            $user->role = $req->value;
            $user->update();
        }
    }
    public function addUserIndex()
    {
        return inertia('Admin/adminUser/AddUser/AddUser');
    }
    public function addUserSubmit(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'role'  => 'required',
            'password' => 'required|same:confirmPassword'
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password)
        ]);
    }
}
