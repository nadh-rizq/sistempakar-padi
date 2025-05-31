<?php
namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class alternatif extends Model
{
    use HasFactory;
    public static function kode($kode,$tabel){
        $tabel = $tabel;
        $data = DB::table($tabel)->orderBy('id', 'DESC')->first();
        $id = $data ? (int) $data->id : 0;

        $idData = $id + 1;

        $kodeData = $kode . str_pad($idData,2,'0',STR_PAD_LEFT);

        return $kodeData;
    }
}
