<?php

namespace App\Http\Controllers;

use App\Models\optPadi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\alternatif;
use App\Models\penanggulanganOpt;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class OptPadiController extends Controller
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
            return Inertia::render('Admin/PagesAdmin/OptPages',[
                'optPadi'=>$optPadi
            ]);
        } catch (\Exception $e) {
            Log::error('Gagal memuat data OPT: ' . $e->getMessage(), ['exception' => $e]);
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
                'opt' => 'required|string|max:255|unique:opt_padis,opt',
                'nama_latin' => 'required|string|max:255',
                'deskripsi' => 'required|string|max:255',
                'gambar' => 'nullable|image|file|max:2048|mimes:jpg,jpeg,png'
            ]);

            $kodeOpt = alternatif::kode('P', 'opt_padis');

            if ($request->hasFile('gambar')) {
                $file = $request->file('gambar');
                $ext = $file->getClientOriginalExtension();
                $nama_file = Str::slug($kodeOpt) . '_' . time() . '.' . $ext;

                $folderPath = storage_path('app/expertstuff');
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }

                Storage::disk('local')->put('expertstuff/'.$nama_file, File::get($file));

                $datavalid['gambar'] = $nama_file;
            }

            $optBaru = optPadi::create([
                'kodeOpt' => $kodeOpt,
                'opt' => ucwords(strtolower($datavalid['opt'])),
                'nama_latin' => ucfirst(strtolower($datavalid['nama_latin'])),
                'deskripsi' => $datavalid['deskripsi'],
                'gambar' => $datavalid['gambar']
            ]);


            penanggulanganOpt::create([
                'opt' => $optBaru->id,
                'pencegahan' => "belum diisi",
                'penanganan' => "belum diisi",
            ]);

            return redirect()->route('list-opt.index')->with('success', 'Menambah Data Baru!');

        } catch (\Exception $e) {

            Log::error('Gagal menambah data OPT: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\optPadi  $optPadi
     * @return \Illuminate\Http\Response
     */
    public function show(optPadi $optPadi, $kodeOpt)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\optPadi  $optPadi
     * @return \Illuminate\Http\Response
     */
    public function edit(optPadi $optPadi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\optPadi  $optPadi
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, optPadi $optPadi, $kodeOpt)
    {
        try {
            $opt = optPadi::where('kodeOpt',$kodeOpt)->firstOrFail();

            $datavalid = $request->validate([
                'opt' => 'required|string|max:255',
                'nama_latin' => 'required|string|max:255',
                'deskripsi' => 'required|string|max:255',
                'gambar' => 'nullable|image|file|max:2048|mimes:jpg,jpeg,png'
            ]);

            if ($request->hasFile('gambar')) {

                if ($opt->gambar && Storage::disk('local')->exists('expertstuff/' . $opt->gambar)) {
                    Storage::disk('local')->delete('expertstuff/' . $opt->gambar);
                }

                $file = $request->file('gambar');
                $ext = $file->getClientOriginalExtension();
                $nama_file = Str::slug($kodeOpt) . '_' . time() . '.' . $ext;

                $folderPath = storage_path('app/expertstuff');
                if (!File::exists($folderPath)) {
                    File::makeDirectory($folderPath, 0755, true);
                }

                Storage::disk('local')->put('expertstuff/' . $nama_file, File::get($file));

                $datavalid['gambar'] = $nama_file;
            }

            $opt->update([
                'opt' => ucwords(strtolower($datavalid['opt'])),
                'nama_latin' => ucfirst(strtolower($datavalid['nama_latin'])),
                'deskripsi' => $datavalid['deskripsi'],
                'gambar' => $datavalid['gambar']
            ]);

            return redirect()->route('list-opt.index')->with('success', 'Mengubah Data!');

        } catch (\Exception $e) {
            Log::error('Gagal mengubah data OPT: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\optPadi  $optPadi
     * @return \Illuminate\Http\Response
     */
    public function destroy(optPadi $optPadi, $kodeOpt)
    {
        try {
            $hapusOpt = optPadi::where('kodeOpt', $kodeOpt)->firstOrFail();
            $hapusOpt->delete();

            return redirect()->route('list-opt.index')->with('success', 'Menghapus Data!');

        } catch (\Exception $e) {
            Log::error('Gagal menghapus data OPT: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    public function viewOptImage($nama_file)
    {
        $file = storage_path('app/expertstuff/'.$nama_file);
        return response()->file($file);
    }
}
