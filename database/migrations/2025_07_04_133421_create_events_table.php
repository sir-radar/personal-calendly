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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timeTz('start_time');
            $table->timeTz('end_time');
            $table->boolean('recurrent');
            $table->enum('recurrent_type', ['none', 'daily', 'weekly', 'monthly']);
            $table->boolean('include_weekends')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
