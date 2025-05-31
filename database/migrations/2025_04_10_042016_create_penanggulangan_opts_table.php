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
        Schema::create('penanggulangan_opts', function (Blueprint $table) {
            $table->id();
            $table->foreignId("opt")->constrained('opt_padis')->onDelete('cascade');
            $table->text("pencegahan");
            $table->text("penanganan");
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
        Schema::dropIfExists('penanggulangan_opts');
    }
};
