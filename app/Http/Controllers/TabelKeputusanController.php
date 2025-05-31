<?php

namespace App\Http\Controllers;

use App\Models\gejalaOptPadi;
use App\Models\kategoriGejala;
use App\Models\optPadi;
use App\Models\tabelKeputusan;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use Inertia\Inertia;

class TabelKeputusanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $optPadi = optPadi::all();
            $gejalaOptPadi = gejalaOptPadi::all();
            $kategoriGejala = kategoriGejala::all();
            $tabelKeputusan = tabelKeputusan::with(['opt','gejala','kategori'])->get();
            return Inertia::render('Admin/PagesAdmin/InferensiPakarPages',[
                'dataKeputusan'=>$tabelKeputusan,
                'dataOpt' => $optPadi,
                'dataGejala' => $gejalaOptPadi,
                'dataKategori' => $kategoriGejala
            ]);
        } catch (\Exception $e) {
            Log::error('Gagal memuat data keputusan pakar: ' . $e->getMessage(), ['exception' => $e]);
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
            $optId = $request->input("opt");
            $selectedGejala = $request->input("selectedGejala");

            $dataToInsert = [];
            foreach ($selectedGejala as $gejala) {
                if (!isset($gejala['gejala'], $gejala['kategori'])) {
                    continue;
                }

                $dataToInsert[] = [
                    'opt'     => $optId,
                    'gejala'  => $gejala['gejala'],
                    'kategori'   => $gejala['kategori'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            DB::table('tabel_keputusans')->insert($dataToInsert);

            return redirect()->route('list-tabKeputusan.index')->with('success', 'Menambah data keputusan!');

        } catch (\Exception $e) {
            Log::error('Gagal menambah data keputusan pakar: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\tabelKeputusan  $tabelKeputusan
     * @return \Illuminate\Http\Response
     */
    public function show(tabelKeputusan $tabelKeputusan, $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\tabelKeputusan  $tabelKeputusan
     * @return \Illuminate\Http\Response
     */
    public function edit(tabelKeputusan $tabelKeputusan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\tabelKeputusan  $tabelKeputusan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $optId = $request->input("opt.id");
            $selectedGejala = $request->input("selectedGejala");

            DB::table('tabel_keputusans')->where('opt', $optId)->delete();

            $dataToInsert = [];
            foreach ($selectedGejala as $gejala) {
                if (!isset($gejala['gejala'], $gejala['kategori'])) {
                    continue;
                }

                $dataToInsert[] = [
                    'opt'     => $optId,
                    'gejala'  => $gejala['gejala'],
                    'kategori'   => $gejala['kategori'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            DB::table('tabel_keputusans')->insert($dataToInsert);

            return redirect()->route('list-tabKeputusan.index')->with('success', 'Mengubah data keputusan!');

        } catch (\Exception $e) {

            Log::error('Gagal mengubah data keputusan pakar: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tabelKeputusan  $tabelKeputusan
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            DB::table('tabel_keputusans')->where('opt', $id)->delete();

            return redirect()->route('list-tabKeputusan.index')->with('success', 'Menghapus data!');
        } catch (\Exception $e) {
            Log::error('Gagal menghapus data keputusan pakar: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }
}
