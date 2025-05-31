<?php

namespace App\Http\Controllers;

use App\Models\gejalaOptPadi;
use Illuminate\Http\Request;
use App\Models\kategoriGejala;
use App\Models\optPadi;
use App\Models\penanggulanganOpt;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DiagnoseController extends Controller
{
    public function EuclideanProbability(Request $request)
    {
        $epData = [
            "blas" => [
                "G01" => 0.02,
                "G02" => 0.03,
                "G03" => 0.05,
                "G04" => 0.06
            ],
            "bercak_coklat" => [
                "G05" => 0.01,
                "G04" => 0.06,
                "G06" => 0.04,
                "G03" => 0.05
            ],
            "hawar_pelepah" => [
                "G05" => 0.01,
                "G04" => 0.06,
                "G07" => 0.08,
                "G03" => 0.05
            ]
            ];

        $gejalaUser = $request->input('gejala', []);

        $hasil = [];

        foreach ($epData as $ep => $NBE) {
            $sum = 0;

            foreach ($gejalaUser as $g) {
                if (isset($NBE[$g])) {
                    $sum += pow($NBE[$g], 2);
                }
            }

            $nilai = sqrt($sum);
            $hasil[] = ["ep" => $ep, "nilai" => $nilai];
        }

        usort($hasil, function ($a, $b) {
            return $b['nilai'] <=> $a['nilai'];
        });

        return response()->json($hasil);

    }

    public function EuclideanProbability2(Request $request)
    {

        // Ambil data kategori (bobot berdasarkan ID kategori)
        $kategoriBobot = kategoriGejala::all()->pluck('bobot', 'id');

        // // Ambil keputusan dan hubungkan dengan bobot kategori

        $keputusan = DB::table('tabel_keputusans')
                    ->join('kategori_gejalas', 'tabel_keputusans.kategori', '=', 'kategori_gejalas.id')
                    ->join('gejala_opt_padis', 'tabel_keputusans.gejala', '=', 'gejala_opt_padis.id')
                    ->select('tabel_keputusans.id','tabel_keputusans.opt','gejala_opt_padis.kodeGejala as gejala', 'tabel_keputusans.kategori')
                    ->get();

        // Ambil gejala yang dipilih dari request
        $selectedGejala = $request->input('gejala', []);

        // Kelompokkan data berdasarkan OPT
        $epData = [];
        foreach ($keputusan as $row) {

            if (!isset($epData[$row->opt])) {
                $epData[$row->opt] = [];
            }
            $epData[$row->opt][$row->gejala] = $kategoriBobot[$row->kategori] ?? 0;
        }



        $results = [];
        foreach ($epData as $opt => $gejalaList) {
            $sum = 0;
            foreach ($selectedGejala as $gejala) {
                if (isset($gejalaList[$gejala])) {
                    $sum += $gejalaList[$gejala]**2;
                }

            }
            $score = sqrt($sum);
            $results[] = ["opt" => $opt, "score" => $score];
        }

        // Urutkan hasilnya dari yang terbesar ke terkecil
        usort($results, fn($a, $b) => $b['score'] <=> $a['score']);

        $dataOptPadi = optPadi::all();
        $dataPenanggulangan = penanggulanganOpt::with('opt')->get();
        $dataSelGejala = gejalaOptPadi::whereIn('kodeGejala', $selectedGejala)->get();

        return Inertia::render('DiagnoseRes',[
            'optPadi'=>$dataOptPadi,
            'penanggulangan'=>$dataPenanggulangan,
            'userSelectedGejala'=>$dataSelGejala,
            'hasil'=>$results,
            'user' => Auth::user(),
        ]);

    }
    public function ShowResult()
    {
        $results = session('hasil_diagnosa');
        $dataOptPadi = optPadi::all();

        return Inertia::render('DiagnoseRes',[
            'optPadi'=>$dataOptPadi,
            'hasil'=>$results
        ]);
    }
}
