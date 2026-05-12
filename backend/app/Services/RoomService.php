<?php

namespace App\Services;

use App\Repositories\Contracts\RoomRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class RoomService
{
    public function __construct(
        private readonly RoomRepositoryInterface $roomRepository
    ) {}

    public function getAllRooms(): Collection
    {
        return $this->roomRepository->all();
    }

    public function getPaginatedRooms(int $page, int $perPage): LengthAwarePaginator
    {
        return $this->roomRepository->paginated($page, $perPage);
    }
}
