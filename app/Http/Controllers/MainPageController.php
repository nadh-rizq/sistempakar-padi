<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\gejalaOptPadi;
use App\Models\optPadi;
use App\Models\penanggulanganOpt;
use App\Models\riwayatDiagnosa;
use App\Models\tabelKeputusan;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Log;


class MainPageController extends Controller
{
    public function mainPage(Request $request)
    {
        // $gejalaOpt = gejalaOptPadi::select('kodeGejala', 'Gejala')->get()->toArray();
        $gejalaOpt = gejalaOptPadi::filter($request->only('search'))
                  ->select('kodeGejala', 'Gejala')
                  ->get();
        $optPadi = optPadi::all();
        $penanggulanganOpt = penanggulanganOpt::with('opt')->get();
        $tabelKeputusan = tabelKeputusan::with(['opt','gejala','kategori'])->get();
        return Inertia::render('MainPage', [
            'dataGejala' => $gejalaOpt,
            'dataOpt' => $optPadi,
            'dataInferensi' => $tabelKeputusan,
            'dataPenanggulangan' => $penanggulanganOpt,
            'search' => $request->search,
            'auth' => Auth::user()
        ]);
    }

    public function simpanDiagnosaUser(Request $request){
        try {
            $user = Auth::user();

            riwayatDiagnosa::create([
                'user' => $user->id,
                'gejala' => json_encode($request['gejala']),
                'opt' => $request['opt'],
                'score' => $request['score'],
            ]);

            return redirect('/riwayat-diagnosa')->with('success','Diagnosa berhasil!');

        } catch (\Exception $e) {
            Log::error('Gagal menyimpan data diagnosa: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Terjadi kesalahan!, silakan coba lagi nanti.');
        }
    }

    public function riwayatDiagnosaUser(Request $request)
    {
        $userId = Auth::user()->id;
        $dataDiagnosa = riwayatDiagnosa::where('user', $userId)->get();

        $gejalaOpt = gejalaOptPadi::filter($request->only('search'))
                  ->select('kodeGejala', 'Gejala')
                  ->get();
        $optPadi = optPadi::all();
        $tabelKeputusan = tabelKeputusan::with(['opt','gejala','kategori'])->get();

        return Inertia::render('User/RiwayatDiagnose', [
            'dataRiwayat' => $dataDiagnosa,
            'dataGejala' => $gejalaOpt,
            'dataOpt' => $optPadi,
            'dataInferensi' => $tabelKeputusan,
            'search' => $request->search
        ]);
    }

}
