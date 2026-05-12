<?php

namespace App\Repositories;

use App\Models\Room;
use App\Repositories\Contracts\RoomRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class RoomRepository implements RoomRepositoryInterface
{
    public function all(): Collection
    {
        return Room::withCount([
            'bookings as is_booked_now' => fn ($q) => $q->where('end_time', '>', now()),
        ])->get();
    }

    public function findById(int $id): Room
    {
        return Room::findOrFail($id);
    }

    public function paginated(int $page, int $perPage): LengthAwarePaginator
    {
        return Room::withCount([
            'bookings as is_booked_now' => fn ($q) => $q->where('end_time', '>', now()),
        ])->paginate($perPage, ['*'], 'page', $page);
    }
}
