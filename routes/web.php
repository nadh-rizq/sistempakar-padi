<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OptPadiController;
use App\Http\Controllers\DiagnoseController;
use App\Http\Controllers\MainPageController;
use App\Http\Controllers\UserDataController;
use App\Http\Controllers\GejalaOptPadiController;
use App\Http\Controllers\KategoriGejalaController;
use App\Http\Controllers\TabelKeputusanController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\RiwayatDiagnosaController;
use App\Http\Controllers\PenanggulanganOptController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/',[MainPageController::class, 'mainPage'])->name('MainDashboard');

Route::get('/auth/redirect', [GoogleAuthController::class, 'redirect'])->name('authRect');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('authCallback');
Route::post('/diagnose',[DiagnoseController::class, 'EuclideanProbability2']);


Route::get('/diagnose', function () {
    return redirect('/');
});

Route::post('/simpan-diagnosa',[MainPageController::class, 'simpanDiagnosaUser']);

Route::get('/show/{file}',[OptPadiController::class, 'viewOptImage'])->name('show');

Route::middleware(['auth', 'role:R0LE01'])->group(function () {
    Route::resource('/list-kategori', KategoriGejalaController::class);
    Route::resource('/list-penanggulangan', PenanggulanganOptController::class);
    Route::resource('/list-user', UserDataController::class);

    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:R0LE01,R0LE02'])->group(function () {
    // Route::get('/adminexpert', [AdminExpertController::class, 'index']);
    Route::resource('/list-riwayat', RiwayatDiagnosaController::class);
    Route::resource('/list-opt', OptPadiController::class);
    Route::post('/list-opt/{list_opt}', [OptPadiController::class, 'update']);
    Route::resource('/list-gejala', GejalaOptPadiController::class);
    Route::resource('/list-tabKeputusan', TabelKeputusanController::class);
    Route::post('/save-keputusan',[TabelKeputusanController::class, 'store']);
    Route::post('/edit-keputusan',[TabelKeputusanController::class, 'update']);
    Route::resource('/list-penanggulangan', PenanggulanganOptController::class);

});

Route::middleware(['auth', 'role:R0LE03'])->group(function () {
    Route::get('/riwayat-diagnosa',[MainPageController::class, 'riwayatDiagnosaUser'])->name('UserDiagnosa');
});

require __DIR__.'/auth.php';
