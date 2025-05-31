<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tabel_keputusans', function (Blueprint $table) {
            $table->id();
            $table->foreignId("opt")->constrained('opt_padis')->onDelete('cascade');
            $table->foreignId("gejala")->constrained('gejala_opt_padis')->onDelete('cascade');
            $table->foreignId("kategori")->constrained('kategori_gejalas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tabel_keputusans');
    }
};
