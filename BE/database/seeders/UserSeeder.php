<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'), 
                'phone_number' => $faker->phoneNumber,
                'address' => $faker->address,
                'type'=>$faker->randomElement(['user','admin']),
                // 'gender'=>$faker->gender,
                // 'birthday'=>$faker->birthday,
                // 'avatar'=>$faker->avatar
            ]);
        }
    }
}
