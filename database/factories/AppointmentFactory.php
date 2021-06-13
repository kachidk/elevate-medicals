<?php

namespace Database\Factories;

use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Appointment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'patient_name' => "fiona adeola",
            'status' => "ongoing",
            //'status' => "completed",
            'lab_test_status' => 'ongoing',
            "created_at" => Carbon::today(),
            "updated_at" => Carbon::today()
        ];
    }
}
