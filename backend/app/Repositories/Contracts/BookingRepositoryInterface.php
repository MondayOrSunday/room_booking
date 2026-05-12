<?php

namespace App\Repositories\Contracts;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Collection;

interface BookingRepositoryInterface
{
    public function getByRoomId(int $roomId): Collection;

    public function hasOverlap(int $roomId, string $startTime, string $endTime): bool;

    public function create(array $data): Booking;

    public function delete(int $id): void;
}
