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
        Schema::create('riwayat_diagnosas', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user")->constrained('users')->onDelete('cascade');
            $table->json("gejala");
            $table->string("opt");
            $table->float("score", 7, 6);
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
        Schema::dropIfExists('riwayat_diagnosas');
    }
};
