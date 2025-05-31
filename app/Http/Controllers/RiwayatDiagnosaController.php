<?php

namespace App\Http\Controllers;

use App\Models\riwayatDiagnosa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class RiwayatDiagnosaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $riwayatDiagnosa = riwayatDiagnosa::with('user')->get();
            return Inertia::render('Admin/PagesAdmin/HistoryDiag',[
                'riwayatDiagnosa' => $riwayatDiagnosa
            ]);
        } catch (\Exception $e) {
            Log::error('Gagal memuat data riwayat diagnosa: ' . $e->getMessage(), ['exception' => $e]);
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

            $user = Auth::user();
            riwayatDiagnosa::create([
                'user' => $user->id,
                'gejala' => json_encode($request['gejala']),
                'opt' => $request['opt'],
                'score' => $request['score'],
            ]);

            return redirect('/riwayat-diagnosa')->with('success', 'Melakukan Diagnosa!');

        } catch (\Exception $e) {
            Log::error('Gagal menambah data riwayat diagnosa: ' . $e->getMessage(), ['exception' => $e]);
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
            $editRiwayat = riwayatDiagnosa::where('id', $id)->firstOrFail();
            $editRiwayat->gejala = $request['gejala'];
            $editRiwayat->opt = $request['opt'];
            $editRiwayat->score = $request['score'];
            $editRiwayat->save();
            return redirect('/list-riwayat')->with('success', 'Mengubah Data!');

        } catch (\Exception $e) {
            Log::error('Gagal mengubah data riwayat diagnosa: ' . $e->getMessage(), ['exception' => $e]);
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
            $hapusHistori = riwayatDiagnosa::where('id', $id)->firstOrFail();
            $hapusHistori->delete();

            return redirect('/list-riwayat')->with('success','Menghapus Data!');
        } catch (\Exception $e) {
            Log::error('Gagal menghapus data riwayat diagnosa: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }
}
