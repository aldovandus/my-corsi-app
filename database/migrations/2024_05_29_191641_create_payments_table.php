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
        /*  Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('method');
            $table->string('amount');
            $table->string('payment_date');
            $table->timestamps();
        }); */

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('subscription_id');
            $table->string('method');
            $table->decimal('amount', 8, 2)->change();
            $table->timestamp('payment_date');
            $table->timestamps();

            // Aggiunta della chiave esterna
            $table->foreign('subscription_id')->references('id')->on('subscription')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['subscription_id']);
            $table->dropColumn('subscription_id');
        });
    }
};