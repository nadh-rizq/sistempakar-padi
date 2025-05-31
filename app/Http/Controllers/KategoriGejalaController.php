<?php

namespace App\Http\Controllers;

use App\Models\kategoriGejala;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class KategoriGejalaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $kategoriGejala = kategoriGejala::all();
            return Inertia::render('Admin/PagesAdmin/KategoriPages',[
                'dataKategori'=>$kategoriGejala
            ]);
        } catch (\Exception $e) {
            Log::error('Gagal memuat data kategori gejala: ' . $e->getMessage(), ['exception' => $e]);
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
                'kategori' => 'required|max:255',
                'bobot' => 'required|numeric',
            ]);

            kategoriGejala::create($datavalid);

            return redirect()->route('list-kategori.index')->with('success', 'Menambah Data Baru!');


        } catch (\Exception $e) {
            Log::error('Gagal menambah data kategori gejala: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\kategoriGejala  $kategoriGejala
     * @return \Illuminate\Http\Response
     */
    public function show(kategoriGejala $kategoriGejala, $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\kategoriGejala  $kategoriGejala
     * @return \Illuminate\Http\Response
     */
    public function edit(kategoriGejala $kategoriGejala)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\kategoriGejala  $kategoriGejala
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, kategoriGejala $kategoriGejala, $id)
    {
        try {

            $datavalid = $request->validate([
                'bobot' => 'required|numeric',
            ]);

            $editKategori = kategoriGejala::findOrFail($id);

            $editKategori->bobot = number_format($datavalid['bobot'], 6, '.', '');
            $editKategori->save();

            return redirect()->route('list-kategori.index')->with('success', 'Mengubah Data!');

        } catch (\Exception $e) {
            Log::error('Gagal mengubah data kategori gejala: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\kategoriGejala  $kategoriGejala
     * @return \Illuminate\Http\Response
     */
    public function destroy(kategoriGejala $kategoriGejala, $id)
    {
        try {
            $hapusKategori = kategoriGejala::findOrFail($id);
            $hapusKategori->delete();

            return redirect()->route('list-kategori.index')->with('success', 'Menghapus Data!');

        } catch (\Exception $e) {
            Log::error('Gagal menghapus data kategori gejala: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }
}
