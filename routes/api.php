<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OptPadiController;
use App\Http\Controllers\DiagnoseController;
use App\Http\Controllers\UserDataController;
use App\Http\Controllers\GejalaOptPadiController;
use App\Http\Controllers\KategoriGejalaController;
use App\Http\Controllers\TabelKeputusanController;
use App\Http\Controllers\RiwayatDiagnosaController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// test postman
Route::resource('/kategori', KategoriGejalaController::class);
Route::resource('/opt', OptPadiController::class);
Route::resource('/gejala', GejalaOptPadiController::class);
Route::resource('/tabKeputusan', TabelKeputusanController::class);
Route::resource('/histori', RiwayatDiagnosaController::class);
Route::resource('/user', UserDataController::class);
Route::post('/cal',[DiagnoseController::class, 'EuclideanProbability2']);

