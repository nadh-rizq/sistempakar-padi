<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\roleUser;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Log;

class UserDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $user = User::all();
            $dataRole = roleUser::all();
            return Inertia::render('Admin/PagesAdmin/UserPages', [
                'user' => $user,
                'dataRole' => $dataRole,
            ]);
        } catch (\Exception $e) {
            Log::error('Gagal memuat data pengguna: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $datavalid = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'kodeRole' => 'required|string|exists:role_users,kodeRole',
                'password' => ['required', Rules\Password::defaults()],
            ]);

            User::create([
                'name' => $datavalid["name"],
                'email' => $datavalid["email"],
                'password' => Hash::make($datavalid["password"]),
                'kodeRole' => $datavalid["kodeRole"]
            ]);

            return redirect()->route('list-user.index')->with('success', 'Menambah Akun Baru!');
        } catch (\Exception $e) {
            Log::error('Gagal menambah data pengguna: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {

            $datavalid = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,'.$id,
                'kodeRole' => 'required|exists:role_users,kodeRole',
            ]);

            $editUser = User::where('id', $id)->firstOrFail();
            $editUser->name = $datavalid['name'];
            $editUser->email = $datavalid['email'];
            $editUser->kodeRole = $datavalid['kodeRole'];
            $editUser->save();

            return redirect()->route('list-user.index')->with('success', 'Mengubah Informasi Akun!');;

        } catch (\Exception $e) {
            Log::error('Gagal mengubah data pengguna: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $hapusUser = User::where('id',$id)->firstOrFail();
            $hapusUser->delete();

            return redirect()->route('list-user.index')->with('success','Menghapus Akun!');

        } catch (\Exception $e) {
            Log::error('Gagal menghapus data pengguna: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }
}
