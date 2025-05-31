<?php

namespace App\Http\Controllers;

use App\Models\gejalaOptPadi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\alternatif;
use Illuminate\Support\Facades\Log;

class GejalaOptPadiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $gejalaOpt = gejalaOptPadi::all();
            return Inertia::render('Admin/PagesAdmin/GejalaPages',[
                'dataGejala'=>$gejalaOpt
            ]);
        } catch (\Exception $e) {
            Log::error('Gagal memuat data gejala OPT: ' . $e->getMessage(), ['exception' => $e]);
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
                'gejala' => 'required|max:255|unique:gejala_opt_padis,gejala'
            ]);

            gejalaOptPadi::create([
                'kodeGejala' => alternatif::kode('G', 'gejala_opt_padis'),
                'gejala' => ucwords(strtolower($datavalid['gejala']))
            ]);

            return redirect()->route('list-gejala.index')->with('success', 'Menambah Data Baru!');

        } catch (\Exception $e) {
            Log::error('Gagal menambah data gejala OPT: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\gejalaOptPadi  $gejalaOptPadi
     * @return \Illuminate\Http\Response
     */
    public function show(gejalaOptPadi $gejalaOptPadi, $kodeGejala)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\gejalaOptPadi  $gejalaOptPadi
     * @return \Illuminate\Http\Response
     */
    public function edit(gejalaOptPadi $gejalaOptPadi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\gejalaOptPadi  $gejalaOptPadi
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, gejalaOptPadi $gejalaOptPadi, $kodeGejala)
    {
        try {
            $datavalid = $request->validate([
                'gejala' => 'required|max:255'
            ]);

            $editGejala = gejalaOptPadi::where('kodeGejala', $kodeGejala)->firstOrFail();
            $editGejala->gejala = ucwords(strtolower($datavalid['gejala']));
            $editGejala->save();

            return redirect()->route('list-gejala.index')->with('success', 'Mengubah Data!');

        } catch (\Exception $e) {
            Log::error('Gagal mengubah data gejala OPT: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\gejalaOptPadi  $gejalaOptPadi
     * @return \Illuminate\Http\Response
     */
    public function destroy(gejalaOptPadi $gejalaOptPadi, $kodeGejala)
    {
        try {
            $hapusGejala = gejalaOptPadi::where('kodeGejala', $kodeGejala)->firstOrFail();
            $hapusGejala->delete();

            return redirect()->route('list-gejala.index')->with('success', 'Menghapus Data!');
        } catch (\Exception $e) {
            Log::error('Gagal menghapus data gejala OPT: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }
}
