<?php

namespace Database\Seeders;

use App\Models\Role;
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
        $list = ['Admin','Saler','User'];
        foreach ($list as $name) {
            Role::create(['role' => $name]);
        }
        $role = Role::where('role', 'User')->value('id');
        for ($i = 0; $i < 10; $i++) {
            User::create([
                'role_id'=> $role, // mặc định là User
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'), 
                'phone_number' => $faker->phoneNumber,
                'address' => $faker->address,
            ]);
        }
    }
}
