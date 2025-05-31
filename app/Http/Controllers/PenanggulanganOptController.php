<?php

namespace App\Http\Controllers;

use App\Models\optPadi;
use Illuminate\Http\Request;
use App\Models\penanggulanganOpt;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PenanggulanganOptController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $penanggulangan = penanggulanganOpt::with('opt')->get();
            $optPadi = optPadi::all();

            return Inertia::render('Admin/PagesAdmin/PenanggulanganPages',[
                'optPadi'=>$optPadi,
                'penanggulangan'=>$penanggulangan
            ]);

        } catch (\Exception $e) {
            Log::error('Gagal memuat data penanggulangan OPT: ' . $e->getMessage(), ['exception' => $e]);
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
                'opt' => 'required|max:255|unique:opt_padis,kodeOpt',
                'pencegahan' => 'required|string',
                'penanganan' => 'required|string',
            ]);

            penanggulanganOpt::create([
                'opt' => $datavalid['opt'],
                'pencegahan' => ucfirst(strtolower($datavalid['pencegahan'])),
                'penanganan' => ucfirst(strtolower($datavalid['penanganan'])),

            ]);
            return redirect()->route('list-penanggulangan.index')->with('success', 'Menambah Data Baru!');
        } catch (\Exception $e) {
            Log::error('Gagal menambah data penanggulangan OPT: ' . $e->getMessage(), ['exception' => $e]);
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
                'opt' => 'required|max:255|exists:opt_padis,id',
                'pencegahan' => 'required|string',
                'penanganan' => 'required|string',
            ]);

            $editPenanggulangan = penanggulanganOpt::where('id', $id)->firstOrFail();
            $editPenanggulangan->opt = $datavalid['opt'];
            $editPenanggulangan->pencegahan = ucfirst(strtolower($datavalid['pencegahan']));
            $editPenanggulangan->penanganan = ucfirst(strtolower($datavalid['penanganan']));
            $editPenanggulangan->save();

            return redirect()->route('list-penanggulangan.index')->with('success', 'Mengubah Data!');
        } catch (\Exception $e) {
            Log::error('Gagal mengubah data penanggulangan OPT: ' . $e->getMessage(), ['exception' => $e]);
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
            $hapusPenanggulangan = penanggulanganOpt::where('id', $id)->firstOrFail();
            $hapusPenanggulangan->delete();

            return redirect()->route('list-penanggulangan.index')->with('success', 'Menghapus Data!');
        } catch (\Exception $e) {
            Log::error('Gagal menghapus data penanggulangan OPT: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }
}
