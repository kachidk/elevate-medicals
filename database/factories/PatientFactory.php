<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Patient::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'  => $this->faker->name,
            //'patient_id'  =>  $this->faker->name,
             'age' => $this->faker->name,
            // 'phone_no',
            // 'email',
            // 'state_of_origin',
            // 'lga_of_origin',
            // 'residential_state',
            // 'residential_lga'
        ];
    }
}
