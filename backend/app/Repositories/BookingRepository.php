<?php

namespace App\Repositories;

use App\Models\Booking;
use App\Repositories\Contracts\BookingRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class BookingRepository implements BookingRepositoryInterface
{
    public function getByRoomId(int $roomId): Collection
    {
        return Booking::where('room_id', $roomId)
            ->orderBy('start_time')
            ->get();
    }

    public function hasOverlap(int $roomId, string $startTime, string $endTime): bool
    {
        return Booking::where('room_id', $roomId)
            ->where('start_time', '<', $endTime)
            ->where('end_time', '>', $startTime)
            ->exists();
    }

    public function create(array $data): Booking
    {
        return Booking::create($data);
    }

    public function delete(int $id): void
    {
        Booking::findOrFail($id)->delete();
    }
}
