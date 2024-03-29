<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('patient_name')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('patient_age')->nullable();
            $table->string('status')->nullable();
            $table->string('nurse_vital_temperature')->nullable();
            $table->string('nurse_vital_blood_pressure')->nullable();
            $table->string('nurse_vital_weight')->nullable();
            $table->string('nurse_name')->nullable();
            $table->string('nurse_users_db_id')->nullable();
            $table->string('doctor_name')->nullable();
            $table->string('doctor_users_db_id')->nullable();
            $table->string('doctor_patient_complain')->nullable();
            $table->string('doctor_diagnosis')->nullable();
            $table->string('doctor_admission_status')->nullable();
            $table->string('doctor_test_status')->nullable();
            $table->string('doctor_test_description')->nullable();
            $table->string('doctor_prescription')->nullable();
            $table->string('lab_test_status')->nullable();
            $table->string('lab_test_result')->nullable();
            $table->string('lab_staff_name')->nullable();
            $table->string('lab_staff_users_db_id')->nullable();
            $table->string('pharmacy_status')->nullable();
            $table->string('pharmacy_staff_name')->nullable();
            $table->string('pharmacy_staff_users_db_id')->nullable();
            $table->string('pharmacy_staff_comment')->nullable();
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
        Schema::dropIfExists('appointments');
    }
}
