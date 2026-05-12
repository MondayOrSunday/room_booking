<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminTokenSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'admin@roombooking.com'],
            [
                'name'     => 'Admin',
                'password' => Hash::make('password'),
            ]
        );

        $token = $user->createToken('admin-token')->plainTextToken;

        $this->command->info('');
        $this->command->info('===========================================');
        $this->command->info('Admin Token (copy to frontend .env):');
        $this->command->info($token);
        $this->command->info('===========================================');
        $this->command->info('');
    }
}
