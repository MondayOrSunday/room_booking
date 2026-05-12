<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            ['name' => 'Mercure ICON Singapore City Centre - Room 101', 'capacity' => 4],
            ['name' => 'Mercure ICON Singapore City Centre - Room 102', 'capacity' => 6],
            ['name' => 'Mercure ICON Singapore City Centre - Room 201', 'capacity' => 10],
            ['name' => 'Mercure ICON Singapore City Centre - Room 202', 'capacity' => 20],
            ['name' => 'Holiday Inn Express Singapore Katong by IHG - Room 301', 'capacity' => 4],
            ['name' => 'Holiday Inn Express Singapore Katong by IHG - Room 302', 'capacity' => 8],
            ['name' => 'Holiday Inn Express Singapore Katong by IHG - Room 303', 'capacity' => 12],
            ['name' => 'Holiday Inn Express Singapore Katong by IHG - Room 404', 'capacity' => 30],
            ['name' => 'Novotel Singapore on Stevens - Room 110', 'capacity' => 6],
            ['name' => 'Novotel Singapore on Stevens - Room 220', 'capacity' => 14],
            ['name' => 'Novotel Singapore on Stevens - Room 330', 'capacity' => 25],
            ['name' => 'Novotel Singapore on Stevens - Room 440', 'capacity' => 50],
            ['name' => 'InterContinental Singapore Robertson Quay - Room 501', 'capacity' => 8],
            ['name' => 'InterContinental Singapore Robertson Quay - Room 502', 'capacity' => 16],
            ['name' => 'InterContinental Singapore Robertson Quay - Room 601', 'capacity' => 40],
            ['name' => 'Orchard Hotel Singapore by Millennium - Room 701', 'capacity' => 6],
            ['name' => 'Orchard Hotel Singapore by Millennium - Room 702', 'capacity' => 12],
            ['name' => 'Orchard Hotel Singapore by Millennium - Room 801', 'capacity' => 20],
            ['name' => 'Orchard Hotel Singapore by Millennium - Room 802', 'capacity' => 35],
            ['name' => 'Orchard Hotel Singapore by Millennium - Room 901', 'capacity' => 60],
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
