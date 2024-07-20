<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('title');
            $table->string('price');
            $table->string('startDate');
            $table->string('endDate')->nullable();
            $table->string('startStage')->nullable();
            $table->string('endDate10')->nullable();
            $table->string('examDate')->nullable();
            $table->string('stageLocation')->nullable();
            $table->string('startTime')->nullable();
            $table->string('endTime')->nullable();
            $table->string('classroom')->nullable();
            $table->text('extra')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course');
    }
};
